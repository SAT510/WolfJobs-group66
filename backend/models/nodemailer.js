// nodemailer.js
// import { createTransport } from 'nodemailer';
const { createTransport } = require('nodemailer');

const transporter = createTransport(

  { 
      secure: true,
      host: 'smtp.gmail.com',
      port: 465,
      auth:{
        user: 'softwareengineering510@gmail.com',
        pass: 'pljrdnigbqkmqqem'
      }
  }
);

function sendMail(to,sub,msg) {
    transporter.sendMail({
      to:to,
      subject:sub,
      html:msg
    });
    console.log("Email Sent");
}

module.exports = sendMail;
// sendMail("shaziamuckram@gmail.com","This is SUBJECT 3","This is test message");


