/*
 * TagoIO - Analysis Example
 * Auto Scaling analysis
 *
 * Check out the SDK documentation on: https://js.sdk.tago.io
 *
 * Ths is a script to automatically check your current usage, and auto-scale your account if needed.
 * You can get the analysis template with all the Environment Variables here:
 *          https://admin.tago.io/template/62151212ec8d8f0012c52772
 *
 * In order to use this analysis, you must setup all the environment variables needed.
 * You're also required to create an Action of trigger type Schedule, and choose to run this analysis.
 * In the action you set how often you want to run this script to check your limits. It can set to a minimum of 1 minute.
 *
 * Environment Variables
 * In order to use this analysis, you must setup the Environment Variable table.
 *   account_token: Your account token. Check the steps at the end to understand how to generate it.
 *   input: 95. The 95 value will scale data input when it reach 95% of the usage. Keep it blank to not scale data input.
 *   output: 95
 *   data_records: 95
 *   analysis: 95
 *   sms: 95
 *   email: 95
 *   push_notification: 95
 *   file_storage: 95
 *
 * Steps to generate an account_token:
 * 1 - Enter the following link: https://admin.tago.io/account/
 * 2 - Select your Profile.
 * 3 - Enter Tokens tab.
 * 4 - Generate a new Token with Expires Never.
 * 5 - Press the Copy Button and place at the Environment Variables tab of this analysis.
*/

const { Analysis, Account, Utils } = require('@tago-io/sdk');

// some common variables we use in all functions
let account;
let accountLimit;


/**
 * Check if service needs autoscaling
 * @param {number} current_value current usage of the profile
 * @param {number} limit limit of the profile
 * @param {number} scale percentage of usage to allow scaling up
 * @returns
 */
function checkAutoScale(currentUsage, allocated, scale) {
  return allocated * (scale * 0.01) <= currentUsage;
}

/**
 * 
 * @param {{amount: number}[]} serviceValues 
 * @param {number} accountLimit 
 */
function getNextTier(serviceValues, accountLimit) {
  if(!accountLimit) {
    return undefined;
  }
  const nextValue = serviceValues.sort((a, b) => a.amount - b.amount).find(({amount}) => amount > accountLimit);

  return nextValue?.amount || undefined;
}

/**
 * Parses the current limit of the account
 * @param {*} servicesLimit
 * @returns
 */
function getAccountLimit(servicesLimit) {
  return Object.keys(servicesLimit).reduce((result, key) => {
    result[key] = servicesLimit[key];

    return result;
  }, {});
}

/**
 * Find the ID of the profile from the token being used.
 * @param {string} account
 * @param {string} token
 * @returns {string | null} profile id
 */
async function getProfileIDByToken(account, token) {
  const profiles = await account.profiles.list();
  for (const profile of profiles) {
    const [token_exist] = await account.profiles.tokenList(profile.id, { token });
    if (token_exist) {
      return profile.id
    }
  }
  return false;
}

async function calculateAutoScale(billing, limit, limit_used, accountLimit, environment) {
  const autoScaleServices = {};
  for (const statisticKey in limit) {
    if (!environment[statisticKey]) {
      continue;
    }

    const scale = Number(environment[statisticKey]);
    if (scale === 0) {
      continue;
    }

    if (isNaN(scale)) {
      console.log(`[ERROR] Ignoring ${statisticKey}, because the environment variable value is not a number.\n`);
      continue;
    }

    const needAutoScale = checkAutoScale(limit_used[statisticKey], limit[statisticKey], scale);

    if (!needAutoScale) {
      continue;
    }

    const nextTier = getNextTier(billing[statisticKey], accountLimit[statisticKey]?.limit)
    if (nextTier) {
      autoScaleServices[statisticKey] = { limit: nextTier };
    }
  }

  if (!Object.keys(autoScaleServices).length) {
    return null;
  }

  return autoScaleServices;
}

function reallocateProfiles(accountLimit, autoScaleServices, profileAllocation) {
  const newAllocation = {};

  for(const service in autoScaleServices) {
    const difference = autoScaleServices?.[service]?.limit - accountLimit?.[service]?.limit;

    if(isNaN(difference) || difference <= 0) {
      continue;
    }

    const currentAllocation = profileAllocation?.[service] || 0;

    newAllocation[service] = difference + currentAllocation;
  }
  
  if (!Object.keys(newAllocation).length) {
    return null;
  }

  return newAllocation;
}

/**
 * Get the environment variables and parses it to a JSON
 * @param {*} context Analysis context 
 * @returns 
 */
function setupEnvironment(context) {
  const environment = Utils.envToJson(context.environment);
  if (!environment) {
    return;
  }

  if (!environment.account_token || environment.account_token.length !== 36) {
    return console.error('[ERROR] You must enter a valid account_token in the environment variable');
  }

  return environment;
}

// The function myAnalysis will run when you execute your analysis
async function myAnalysis(context) {
  const environment = setupEnvironment(context);

  // Setup the account and get's the ID of the profile the account token belongs to.
  account = new Account({ token: environment.account_token });
  const id = await getProfileIDByToken(account, environment.account_token);
  if (!id) {
    return console.error('Profile not found for the account token in the environment variable');
  }

  // Get the current subscriptions of our account for all the services.
  const { services: servicesLimit } = await account.billing.getSubscription();
  accountLimit = getAccountLimit(servicesLimit);

  // get current limit and used resources of the profile.
  const { limit, limit_used } = await account.profiles.summary(id);

  // get the tiers of all services, so we know the next tier for our limits.
  const billing = await account.billing.getPrices();

  // Check each service to see if it needs scaling
  const autoScaleServices = await calculateAutoScale(billing, limit, limit_used, accountLimit, environment);

  // Stop if no auto-scale needed
  if (!autoScaleServices) {
    console.log('Services are okay, no auto-scaling needed.')
    return;
  }

  console.log(`Auto-scaling the services: ${Object.keys(autoScaleServices).join(', ')}`);

  // Update our subscription, so we are actually scaling the account.
  const billing_success = await account.billing.editSubscription({
    services: autoScaleServices,
  }).catch(e => console.log(`[ERROR] ${e.message || e}`));

  if (!billing_success) {
    return;
  }

  // Stop here if account has only one profile. No need to reallocate resources
  const profiles = await account.profiles.list();
  if (profiles.length > 1) {
    // Make sure we reallocate only what we just subscribed
    const amountToReallocate = reallocateProfiles(accountLimit, autoScaleServices, limit);
    
    if(amountToReallocate) {
      // Allocate all the subscribed limit to the profile.
      await account.billing.editAllocation([
        {
          profile: id,
          ...amountToReallocate,
        },
      ]).catch(e => console.log(`[ERROR] ${e.message || e}`));
    }

  }
}

// if(process.env.NODE_ENV === "test") {
//   module.exports = { 
//     checkAutoScale,
//     reallocateProfiles,
//     calculateAutoScale
//   }
// } else {
//   module.exports = new Analysis(myAnalysis);
// }

myAnalysis({environment: [
  {key: "account_token", value: "2ae92425-61f7-4486-8509-af7ba452a674"},
  {key: "input", value: 90}
]}).then(console.log)
.catch(console.error)