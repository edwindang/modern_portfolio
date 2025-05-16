import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Validate form inputs
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST, // "smtp.gmail.com"
        port: Number(process.env.EMAIL_SERVER_PORT), // 587
        secure: Number(process.env.EMAIL_SERVER_PORT) === 465, // false for 587, true for 465
        auth: {
          user: process.env.EMAIL_SERVER_USER, // "edwin.dang88@gmail.com"
          pass: process.env.EMAIL_SERVER_PASSWORD, // Your App Password
        },
      })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
