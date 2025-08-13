import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

interface Options {
  receiver_mail: string;
  subject: string;
  body: string;
}

export const sendMail = async ({ receiver_mail, subject, body }: Options) => {
  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_NAME,
      pass: process.env.SMTP_PASS,
    },
  } as SMTPTransport.Options);

  const mail = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: receiver_mail,
    subject,
    html: body,
  };

  await transport.sendMail(mail);
};
