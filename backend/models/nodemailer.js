/**
 * Creates a transport instance for sending emails using Gmail's SMTP server.
 * Configures the necessary email credentials, secure connection, and port details.
 */
const { createTransport } = require("nodemailer");
/**
 * Configures the transporter object with the necessary settings to send emails via Gmail's SMTP server.
 * - Uses a secure connection on port 465
 * - Provides Gmail credentials (username and password) for authentication
 */
const transporter = createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "softwareengineering510@gmail.com", // Gmail username for authentication
    pass: "pljrdnigbqkmqqem", // Gmail app password for authentication
  },
});
/**
 * Sends an email using the configured transporter.
 *
 * @param {string} to - Recipient email address.
 * @param {string} sub - Subject of the email.
 * @param {string} msg - HTML content of the email body.
 */
function sendMail(to, sub, msg) {
  transporter.sendMail({
    to: to, // Recipient's email address
    subject: sub, // Subject line of the email
    html: msg, // HTML content of the email message
  });
  console.log("Email Sent"); // Logs a message after the email is sent
}
/**
 * Exports the sendMail function for external use.
 */
module.exports = sendMail;
// sendMail("shaziamuckram@gmail.com","This is SUBJECT 3","This is test message");
