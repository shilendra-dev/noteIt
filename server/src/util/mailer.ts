import { config } from "@/config/config.js";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.gmailAuth.user, // your Gmail address
    pass: config.gmailAuth.pass, // your App Password
  },
});
