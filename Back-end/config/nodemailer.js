import nodeMailer from "nodemailer";

console.log(process.env.SMTP_USER,process.env.SMTP_PASS)
const trasporter = nodeMailer.createTransport({
host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

trasporter.verify((error, success) => {
  if (error) {
    console.log("SMTP VERIFY ERROR ❌", error);
  } else {
    console.log("SMTP SERVER READY ✅");
  }
});

export default trasporter;