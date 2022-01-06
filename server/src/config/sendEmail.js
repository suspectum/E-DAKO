import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const OAuth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  OAuth2Client.setCredentials({
    refresh_token: process.env.GMAIL_API_REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve) => {
    OAuth2Client.getAccessToken((token) => {
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_API_USER,
      accessToken,
      clientId: process.env.GMAIL_API_CLIENT_ID,
      clientSecret: process.env.GMAIL_API_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_API_REFRESH_TOKEN,
    },
  });

  return transporter;
};

export async function sendEmail({ to, subject, html, from = process.env.GMAIL_API_USER }) {
  const transporter = await createTransporter();

  await transporter.sendMail({ from, to, subject, html });
}
