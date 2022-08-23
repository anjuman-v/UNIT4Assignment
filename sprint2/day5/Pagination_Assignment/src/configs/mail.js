const nodemailer = require("nodemailer");


module.exports = nodemailer.createTransport({

    host:"smtp.mailtrap.io",
    port: 587,
    secure: false, 
    auth: {
    user: "01dad8a0c44391",
    pass: "b28c3bac65e956",
  },


})