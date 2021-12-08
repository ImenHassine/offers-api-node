const nodemailer = require('nodemailer');
const { emailConfig } = require('../../config/vars');
const Email = require('email-templates');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: emailConfig.username,
    pass: emailConfig.password,
  },
  secure: false, // upgrades later with STARTTLS -- change this based on the PORT
});

// verify connection configuration
transporter.verify((error) => {
  if (error) {
    console.log('error with email connection');
  }
});

exports.sendMailConfirm = async (toEmail,confirmToken) => {
  const email = new Email({
    views: { root: __dirname },
    message: {
      from: 'support@your-app.com',
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: transporter,
  });

  email
    .send({
      template: 'passwordReset',
      message: {
        to: toEmail,

      },
      locals: {
        productName: 'enjoyOffers',
        // passwordResetUrl should be a URL to your app that displays a view where they
        // can enter a new password along with passing the confirmToken in the params
        passwordResetUrl: `https://${emailConfig.baseURL}/user/confirm-mail/${confirmToken}`,
      },
    })
    .catch(() => console.log('error sending password reset email'));
};

exports.sendPasswordReset = async (toEmail,confirmToken) => {
  console.log("toEmail",toEmail)
  console.log("confirmToken",confirmToken)

  const email = new Email({
    views: { root: __dirname },
    message: {
      from: 'support@your-app.com',
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: transporter,
  });
  console.log("email",`${emailConfig.baseURL}/#/reset-pwd/?token=${confirmToken}`)
  email
    .send({
      template: 'passwordReset',
      message: {
        to: toEmail,

      },
      locals: {
        productName: 'enjoyOffers',
        // passwordResetUrl should be a URL to your app that displays a view where they
        // can enter a new password along with passing the confirmToken in the params
        passwordResetUrl: `${emailConfig.baseURL}/#/reset-pwd/?token=${confirmToken}`,
      },
    })
    .catch((err) => console.log('error sending password reset email '+err));
};

exports.sendPasswordChangeEmail = async (user) => {
  const email = new Email({
    views: { root: __dirname },
    message: {
      from: 'support@your-app.com',
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: transporter,
  });

  email
    .send({
      template: 'passwordChange',
      message: {
        to: user.email,
      },
      locals: {
        productName: 'enjoyOffers',
        name: user.name,
      },
    })
    .catch(() => console.log('error sending change password email'));
};
