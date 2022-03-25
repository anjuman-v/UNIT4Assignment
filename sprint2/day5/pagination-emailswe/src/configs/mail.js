const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "accebc2c00c956", // generated ethereal user
    pass: "cc197e7f5a45f7", // generated ethereal password
  },
});
