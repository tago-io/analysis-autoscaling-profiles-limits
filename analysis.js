/*
 ** Analysis Example
 ** Auto Scaling profiles limits
 **
 ** Environment Variables
 ** In order to use this analysis, you must setup the Environment Variable table.
 **   account_token: Your account token. Check bellow how to get this.
 **   profile_id: Your profile id. Check bellow how to get this.
 **
 ** Steps to generate an account_token:
 ** 1 - Enter the following link: https://admin.tago.io/account/
 ** 2 - Select your Profile.
 ** 3 - Enter Tokens tab.
 ** 4 - Generate a new Token with Expires Never.
 ** 5 - Press the Copy Button and place at the Environment Variables tab of this analysis.
 **
 ** Steps to get profile_id:
 ** 1 - Enter the following link: https://admin.tago.io/profile/
 ** 2 - Select your Profile.
 ** 3 - Enter more tab.
 ** 4 - Press the Copy Button to the Profile ID and place at the Environment Variables tab of this analysis.
 */
const { Analysis, Account, Utils } = require("@tago-io/sdk");

async function auto_scale_data_input(profile_stats, profile_stats_lenght, limits, account, profile_id) {
  const data_input_usage = profile_stats[profile_stats_lenght - 1].input;
  if (limits * 0.95 <= data_input_usage) {
    if (limits === 1000000) {
      const result = await account.profiles.serviceEdit(profile_id, { input: 3000000 });
    } else if (limits === 3000000) {
      const result = await account.profiles.serviceEdit(profile_id, { input: 10000000 });
    } else if (limits === 10000000) {
      const result = await account.profiles.serviceEdit(profile_id, { input: 15000000 });
    } else if (limits === 15000000) {
      const result = await account.profiles.serviceEdit(profile_id, { input: 30000000 });
    } else if (limits === 30000000) {
      const result = await account.profiles.serviceEdit(profile_id, { input: 50000000 });
    } else if (limits === 50000000) {
      const result = await account.profiles.serviceEdit(profile_id, { input: 100000000 });
    } else if (limits === 100000000) {
      const result = await account.profiles.serviceEdit(profile_id, { input: 150000000 });
    } else if (limits === 150000000) {
      const result = await account.profiles.serviceEdit(profile_id, { input: 200000000 });
    } else if (limits === 200000000) {
      const result = await account.profiles.serviceEdit(profile_id, { input: 300000000 });
    } else if (limits === 300000000) {
      const result = await account.profiles.serviceEdit(profile_id, { input: 500000000 });
    } else if (limits === 500000000) {
      const result = await account.profiles.serviceEdit(profile_id, { input: 1000000000 });
    } else if (limits === 1000000000) {
      const result = await account.profiles.serviceEdit(profile_id, { input: 2000000000 });
    } else if (limits === 2000000000) {
      const result = await account.profiles.serviceEdit(profile_id, { input: 3000000000 });
    }
  }
}
async function auto_scale_data_output(profile_stats, profile_stats_lenght, limits, account, profile_id) {
  const data_output_usage = profile_stats[profile_stats_lenght - 1].output;
  if (limits * 0.95 <= data_output_usage) {
    if (limits === 3000000) {
      const result = await account.profiles.serviceEdit(profile_id, { output: 18000000 });
    } else if (limits === 18000000) {
      const result = await account.profiles.serviceEdit(profile_id, { output: 54000000 });
    } else if (limits === 54000000) {
      const result = await account.profiles.serviceEdit(profile_id, { output: 90000000 });
    } else if (limits === 90000000) {
      const result = await account.profiles.serviceEdit(profile_id, { output: 180000000 });
    } else if (limits === 180000000) {
      const result = await account.profiles.serviceEdit(profile_id, { output: 360000000 });
    } else if (limits === 360000000) {
      const result = await account.profiles.serviceEdit(profile_id, { output: 5400000000 });
    } else if (limits === 5400000000) {
      const result = await account.profiles.serviceEdit(profile_id, { output: 9000000000 });
    } else if (limits === 9000000000) {
      const result = await account.profiles.serviceEdit(profile_id, { output: 13500000000 });
    } else if (limits === 13500000000) {
      const result = await account.profiles.serviceEdit(profile_id, { output: 18000000000 });
    } else if (limits === 18000000000) {
      const result = await account.profiles.serviceEdit(profile_id, { output: 36000000000 });
    } else if (limits === 36000000000) {
      const result = await account.profiles.serviceEdit(profile_id, { output: 54000000000 });
    } else if (limits === 54000000000) {
      const result = await account.profiles.serviceEdit(profile_id, { output: 720000000000 });
    } else if (limits === 720000000000) {
      const result = await account.profiles.serviceEdit(profile_id, { output: 900000000000 });
    }
  }
}
async function auto_scale_data_storage(profile_stats, profile_stats_lenght, limits, account, profile_id) {
  const data_storage_usage = profile_stats[profile_stats_lenght - 1].data_records;
  if (limits * 0.95 <= data_storage_usage) {
    if (limits === 800000) {
      const result = await account.profiles.serviceEdit(profile_id, { data_records: 1500000 });
    } else if (limits === 1500000) {
      const result = await account.profiles.serviceEdit(profile_id, { data_records: 5000000 });
    } else if (limits === 5000000) {
      const result = await account.profiles.serviceEdit(profile_id, { data_records: 8000000 });
    } else if (limits === 8000000) {
      const result = await account.profiles.serviceEdit(profile_id, { data_records: 15000000 });
    } else if (limits === 15000000) {
      const result = await account.profiles.serviceEdit(profile_id, { data_records: 50000000 });
    } else if (limits === 50000000) {
      const result = await account.profiles.serviceEdit(profile_id, { data_records: 80000000 });
    } else if (limits === 80000000) {
      const result = await account.profiles.serviceEdit(profile_id, { data_records: 150000000 });
    } else if (limits === 150000000) {
      const result = await account.profiles.serviceEdit(profile_id, { data_records: 250000000 });
    } else if (limits === 250000000) {
      const result = await account.profiles.serviceEdit(profile_id, { data_records: 350000000 });
    } else if (limits === 350000000) {
      const result = await account.profiles.serviceEdit(profile_id, { data_records: 500000000 });
    } else if (limits === 500000000) {
      const result = await account.profiles.serviceEdit(profile_id, { data_records: 750000000 });
    } else if (limits === 750000000) {
      const result = await account.profiles.serviceEdit(profile_id, { data_records: 1000000000 });
    } else if (limits === 1000000000) {
      const result = await account.profiles.serviceEdit(profile_id, { data_records: 1500000000 });
    } else if (limits === 1500000000) {
      const result = await account.profiles.serviceEdit(profile_id, { data_records: 2000000000 });
    }
  }
}
async function auto_scale_analysis(profile_stats, profile_stats_lenght, limits, account, profile_id) {
  const analysis_usage = profile_stats[profile_stats_lenght - 1].analysis;
  if (limits * 0.95 <= analysis_usage) {
    if (limits === 3000) {
      const result = await account.profiles.serviceEdit(profile_id, { analysis: 6000 });
    } else if (limits === 6000) {
      const result = await account.profiles.serviceEdit(profile_id, { analysis: 12000 });
    } else if (limits === 12000) {
      const result = await account.profiles.serviceEdit(profile_id, { analysis: 36000 });
    } else if (limits === 36000) {
      const result = await account.profiles.serviceEdit(profile_id, { analysis: 60000 });
    } else if (limits === 60000) {
      const result = await account.profiles.serviceEdit(profile_id, { analysis: 120000 });
    } else if (limits === 120000) {
      const result = await account.profiles.serviceEdit(profile_id, { analysis: 240000 });
    } else if (limits === 240000) {
      const result = await account.profiles.serviceEdit(profile_id, { analysis: 360000 });
    } else if (limits === 360000) {
      const result = await account.profiles.serviceEdit(profile_id, { analysis: 600000 });
    } else if (limits === 600000) {
      const result = await account.profiles.serviceEdit(profile_id, { analysis: 900000 });
    } else if (limits === 900000) {
      const result = await account.profiles.serviceEdit(profile_id, { analysis: 1200000 });
    } else if (limits === 1200000) {
      const result = await account.profiles.serviceEdit(profile_id, { analysis: 2400000 });
    } else if (limits === 2400000) {
      const result = await account.profiles.serviceEdit(profile_id, { analysis: 3600000 });
    } else if (limits === 3600000) {
      const result = await account.profiles.serviceEdit(profile_id, { analysis: 7000000 });
    }
  }
}
async function auto_scale_sms(profile_stats, profile_stats_lenght, limits, account, profile_id) {
  const sms_usage = profile_stats[profile_stats_lenght - 1].sms;
  if (limits * 0.95 <= sms_usage) {
    if (limits === 10) {
      const result = await account.profiles.serviceEdit(profile_id, { sms: 100 });
    } else if (limits === 100) {
      const result = await account.profiles.serviceEdit(profile_id, { sms: 200 });
    } else if (limits === 200) {
      const result = await account.profiles.serviceEdit(profile_id, { sms: 500 });
    } else if (limits === 500) {
      const result = await account.profiles.serviceEdit(profile_id, { sms: 1000 });
    } else if (limits === 1000) {
      const result = await account.profiles.serviceEdit(profile_id, { sms: 5000 });
    } else if (limits === 5000) {
      const result = await account.profiles.serviceEdit(profile_id, { sms: 10000 });
    } else if (limits === 10000) {
      const result = await account.profiles.serviceEdit(profile_id, { sms: 20000 });
    } else if (limits === 20000) {
      const result = await account.profiles.serviceEdit(profile_id, { sms: 30000 });
    } else if (limits === 30000) {
      const result = await account.profiles.serviceEdit(profile_id, { sms: 40000 });
    } else if (limits === 40000) {
      const result = await account.profiles.serviceEdit(profile_id, { sms: 50000 });
    }
  }
}
async function auto_scale_email(profile_stats, profile_stats_lenght, limits, account, profile_id) {
  const email_usage = profile_stats[profile_stats_lenght - 1].email;
  if (limits * 0.95 <= email_usage) {
    if (limits === 100) {
      const result = await account.profiles.serviceEdit(profile_id, { email: 1000 });
    } else if (limits === 1000) {
      const result = await account.profiles.serviceEdit(profile_id, { email: 2000 });
    } else if (limits === 2000) {
      const result = await account.profiles.serviceEdit(profile_id, { email: 5000 });
    } else if (limits === 5000) {
      const result = await account.profiles.serviceEdit(profile_id, { email: 10000 });
    } else if (limits === 10000) {
      const result = await account.profiles.serviceEdit(profile_id, { email: 50000 });
    } else if (limits === 50000) {
      const result = await account.profiles.serviceEdit(profile_id, { email: 100000 });
    } else if (limits === 100000) {
      const result = await account.profiles.serviceEdit(profile_id, { email: 500000 });
    }
  }
}

async function startAnalysis(context) {
  // Get the environment variables.
  const env = Utils.envToJson(context.environment);
  if (!env.account_token) {
    return context.log('Missing "account_token" environment variable');
  } else if (env.account_token.length !== 36) {
    return context.log('Invalid "account_token" in the environment variable');
  } else  if (!env.profile_id) {
    return context.log("Profile Id not found, please put the profile_id in Environment Variables on the analysis");
  }

  // Instance the Account class
  const account = new Account({ token: env.account_token });
  // Get info of profile
  const profile_stats = await account.profiles.usageStatisticList(env.profile_id);
  const profile_stats_lenght = profile_stats.length;
  const limits = (await account.profiles.summary(env.profile_id)).limit;
  auto_scale_data_input(profile_stats, profile_stats_lenght, limits.input, account, env.profile_id);
  auto_scale_data_output(profile_stats, profile_stats_lenght, limits.output, account, env.profile_id);
  auto_scale_data_storage(profile_stats, profile_stats_lenght, limits.data_records, account, env.profile_id);
  auto_scale_analysis(profile_stats, profile_stats_lenght, limits.analysis, account, env.profile_id);
  auto_scale_sms(profile_stats, profile_stats_lenght, limits.sms, account, env.profile_id);
  auto_scale_email(profile_stats, profile_stats_lenght, limits.email, account, env.profile_id);
  context.log("Analysis Finish");
}
module.exports = new Analysis(startAnalysis, { token: "Analysis Token" });
