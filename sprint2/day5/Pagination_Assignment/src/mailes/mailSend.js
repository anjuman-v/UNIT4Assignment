const transporter = require("./configs/mail");

module.exports = (data) =>{

    transporter.sendMail(data);

}