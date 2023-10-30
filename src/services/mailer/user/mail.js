'use strict';

const Mailjet = require('node-mailjet');

function sendResetPassword(user) {
  const mailjet = Mailjet.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'qthanh18tn@gmail.com',
          Name: 'noreply@gmail.com',
        },
        To: [
          {
            Email: user.email,
            Name: user.name,
          },
        ],
        Subject: '[Taxi] Reset Password',
        HTMLPart: `
        <p>Hi ${user.name},</p>
        <br/>
        <p>Please use this OTP to reset the password:</p>
        <br/>
        <p>${user.resetToken}</p>
        <br/>
        <p>If you did not request a password reset, please ignore this email or reply to let us know.
        This password reset link is only valid for the next 30 minutes.</p>
        <br/>
        <p>Thanks,</p>
              `,
      },
    ],
  });
  return request;
}

module.exports = () => {
  return sendResetPassword;
};
