// require('dotenv').config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  secure: true
});

const fromMailAddress = "fumito.suzuki@transpigeon.com";

exports.handler = function (event, context, callback) {
  const { name, email, message } = JSON.parse(event.body).payload.data;

  let mailOptions = {
    from: `"Transpigeon"<${fromMailAddress}> `,
    to: `khako@icloud.com`,
    subject: "Hello NodeMailer",
    text: "Testing...",
    html: "<b>Testing2...</b>"
  };

  console.log(event);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      callback(error);
    } else {
      callback(null, {
        statusCode: 200,
        body: "Ok"
      });
    }
  });
};
