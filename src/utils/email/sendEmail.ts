import nodemailer from "nodemailer";
import fs from "fs/promises";
import dotenv from "dotenv";

//TODO: create email address for app and update here.

export default async function sendEmail(emailAddress: string, OTP: string) {
  const emailTemplate = await fs.readFile(
    "src/templates/logInEmail.html",
    "utf8"
  );

  const updatedHtml = emailTemplate.replace("{{OTP}}", OTP);
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yoirchalk1995@gmail.com",
      pass: process.env.EMAIL_SECRET,
    },
  });

  await transport.sendMail({
    from: "yoirchalk1995@gmail.com",
    to: emailAddress,
    subject: "OTP",
    html: updatedHtml,
  });
}
