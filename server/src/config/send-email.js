import nodemailer from "nodemailer";

const smtpOptions = {
  host: process.env.smtpHost,
  port: process.env.smtpPort,
  auth: {
    user: process.env.smtpUser,
    pass: process.env.smtpPass,
  },
};

async function sendEmail({ to, subject, html, from = process.env.emailFrom }) {
  const transporter = nodemailer.createTransport(smtpOptions);

  await transporter.sendMail({ from, to, subject, html });
}

export default sendEmail;
