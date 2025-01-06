require('dotenv-safe').config();
const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      service: process.env.NODEMAILER_SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: subject,
      html: text,
    });

    console.log('email sent sucessfully');
  } catch (error) {
    console.error('email not sent', error);
  }
};

const sendPasswordResetEmail = (userEmail, link) => {
  const subject = 'Password reset';
  const htmlContent = `
      <h3>Password reset requested for ${userEmail}</h3>
      <p>If you didn't request this change, please ignore this email.</p>
      <p>Otherwise, you can reset your password using the link below:</p>
      <a href="${link}">Reset password</a>
      <p>This link will expire in 5 days for security purposes.</p>
    `;

  sendEmail(userEmail, subject, htmlContent);
};

module.exports = {
  sendEmail,
  sendPasswordResetEmail,
};
