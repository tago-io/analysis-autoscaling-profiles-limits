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
 ** Steps to generate an profile_id:
 ** 1 - Enter the following link: https://admin.tago.io/profile/
 ** 2 - Select your Profile.
 ** 3 - Enter more tab.
 ** 4 - Press the Copy Button to the Profile ID and place at the Environment Variables tab of this analysis.
 */
const { Analysis, Account, Utils} = require('@tago-io/sdk');

async function startAnalysis(context) {
  // Get the environment variables.
  const env = Utils.envToJson(context.environment);
  if (!env.account_token) return context.log('Missing "account_token" environment variable');
  else if (env.account_token.length !== 36) return context.log('Invalid "account_token" in the environment variable');
  if(!env.profile_id) return context.log('Profile Id not found, please put the profile_id in Environment Variables on the analysis');
  // Instance the Account class
  const account = new Account({ token: env.account_token });
  // Get info of profile
  const profile_info = await account.profiles.info(env.profile_id);
  // Send profile info to the context log, just to check the profile
  context.log('Your Profile Info Is:',profile_info);
  // Edit auto_scale = true all params
  const result = await account.profiles.serviceEdit(env.profile_id,
  {auto_scale:{analysis: true, data_records: true, input: true, output: true,sms:true, email: true}})
  .catch((error) => {
    throw error;
  });
  // Send results of the serviceEdit
  context.log(result);
}

module.exports = new Analysis(startAnalysis,{ token: 'MY-ANALYSIS-TOKEN-HERE'});
