const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const createTransport = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    host: "smpt.gmail.com",
    auth: {
      user: "suale.machiavelli33@gmail.com",
      // user: process.env.EMAIL_USERNAME,
      pass: "SualeEinstein99@",
      // pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "suale.machiavelli33@gmail.com",
    to: "sualemachiavelli@gmail.com",
    subject: options.subject,
    text: options.message,
  };

  await createTransport.sendMail(mailOptions);
};

module.exports = sendEmail;
