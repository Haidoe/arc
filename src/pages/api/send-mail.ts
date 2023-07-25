import type { NextApiRequest, NextApiResponse } from "next";
import { type EmailOptions, sendEmail } from "../../config/nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Only allow POST requests
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
  }

  //Parse the body of the request as JSON and must be of type EmailOptions
  const content = req.body as EmailOptions;

  // console.log("Content >> ", content);

  //Checking all properties of EmailOptions have been provided
  if (!content.from || !content.to || !content.subject || !content.text) {
    res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const result = await sendEmail(content);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}
