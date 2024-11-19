// nodemailer.js
import { createTransport } from 'nodemailer';

const transporter = createTransport(

  {
      secure: true,
      host: 'smtp.gmail.com',
      port: 465,
      auth:{
        user: 'softwareengineering510@gmail.com',
        pass: 'tdndhbposnhsgnwh'
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

// sendMail("softwareengineering510@gmail.com","This is SUBJECT 2","This is test message");


