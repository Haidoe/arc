import nodemailer, { type Transporter } from "nodemailer";
import { validateEmail } from "~/helper/helper";

let transporter: Transporter;

//Responsible for creating the transporter object
//What does the transporter object do?
//It is responsible for sending the email
function createTransporter() {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
}

export async function sendEmail(
  emailOptions: EmailOptions
): Promise<Error | MailResponse> {
  if (!transporter) {
    createTransporter();
  }

  return new Promise((resolve, reject) => {
    const result = validateEmail(emailOptions.to);

    if (!result) {
      reject({ message: "Invalid Email Address" });
    }

    transporter.sendMail(emailOptions, (error, info: MailResponse) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

type MailResponse = {
  accepted: string[];
  rejected: string[];
};

export interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}
