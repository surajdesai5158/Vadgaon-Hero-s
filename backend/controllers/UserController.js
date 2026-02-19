import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";



export const registerUser = async (req, res) => {
  try {

    const newUser = new User({
      ...req.body,
      role: "user",
      isApproved: false
    });

    await newUser.save();
    sendEmail(newUser);

    res.json({
      message: "Registration successful. Wait for admin approval."
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const sendEmail = async (newUser) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
 
        const mailOptions = {
            from: process.env.EMAIL, // Sender's email address
            to: newUser.email, // Receiver's email address
            subject: 'Welcome to Our Service!', // Clear subject for the welcome email
            //remove space before (<p>Hello $ {newUser.name},</p>) to <p>Hello $ {newUser.name},</p> and add backticks from opening of p tag to closign of last p tag
            html: `<p>Hello ${newUser.name},</p>
                   <p>Welcome to our Vadgaon village portal! We're thrilled to have you onboard.</p>
                   <p>If you have any questions or need help getting started, feel free to reach out to our support team.</p>
                   <p>Best regards,<br>Suraj Baburao Desai</p>`, // HTML body for better formatting
        };
 
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Failed to send welcome email' });
            }
            console.log('Email sent:', info.response);
        });
    } catch (error) {
        console.error('Error in email function:', error);
        throw new Error(error);
    }
};





export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password correctly
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // Only USERS need approval
    if (user.role === "user" && !user.isApproved) {
      return res.status(403).json({
        message: "Your account is waiting for admin approval"
      });
    }
       const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role,
        token: token,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).sort({ createdAt: -1 });
  res.json(users);
};

export const approveUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      isApproved: true
    });

    res.json({ message: "User Approved Successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




/* ================== GET USER PROFILE ================== */
// GET /api/users/profile
export const getUserProfile = async (req, res) => {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token required" });
    }

    const token = auth.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, "secretKey123");
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("getUserProfile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================== UPDATE PROFILE ================== */
// PUT /api/users/profile
export const updateProfile = async (req, res) => {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token required" });
    }

    const token = auth.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, "secretKey123");
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const { name, email, contact } = req.body;

    if (!name || !email || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Email uniqueness check
    if (email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    user.name = name;
    user.email = email;
    user.contact = contact;
    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("updateProfile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
