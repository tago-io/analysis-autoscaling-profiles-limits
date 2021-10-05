# analysis-autoscaling-profiles-limits
Autoscaling profiles limits

Environment Variables
In order to use this analysis, you must setup the Environment Variable table.
    account_token: Your account token. Check bellow how to get this.
    profile_id: Your profile id. Check bellow how to get this.

Steps to generate an account_token:

1.Enter the following link: https://admin.tago.io/account/
2.Select your Profile.
3.Enter Tokens tab.
4.Generate a new Token with Expires Never.
5.Press the Copy Button and place at the Environment Variables tab of this analysis.

Steps to generate an profile_id:

1.Enter the following link: https://admin.tago.io/profile/
2.Select your Profile.
3.Enter more tab.
4.Press the Copy Button to the Profile ID and place at the Environment Variables tab of this analysis.

How to run this analysis

You can just upload the analysis.js file.

or

You can run locally, you should have last node version and install all dependencies running npm install on your terminal in this project folder, after that, you can run the project just calling analysis, node analysis.js;
