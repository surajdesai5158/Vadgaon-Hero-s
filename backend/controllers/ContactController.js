import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

// ✅ CREATE CONTACT MESSAGE
 const contactUser = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 1️⃣ Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️⃣ Save to database
    const newContact = await Contact.create({
      name,
      email,
      message,
    });

    // 3️⃣ Response
    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newContact,
    });
    sendMail(user.email, "Welcome", "Hello");

  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export default contactUser;


export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


 const sendMail = async (to, subject, text) => {
  try {
    if (!to) {
      throw new Error("Recipient email (to) is missing");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Admin" <${process.env.EMAIL}>`,
      to,
      subject,
      text,
    });

    console.log("Email sent to:", to);
  } catch (error) {
    console.error("Email error:", error.message);
    throw error; // important so controller knows it failed
  }
};



export const replyToContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({ message: "Reply is required" });
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Save reply
    contact.reply = reply;
    contact.repliedAt = new Date();
    await contact.save();

    // Send email
    await sendMail(
      contact.email,
      "Reply from Admin",
      reply
    );

    res.status(200).json({
      success: true,
      message: "Reply sent successfully",
      contact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



export const deleteMessage = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({ message: "Message deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

