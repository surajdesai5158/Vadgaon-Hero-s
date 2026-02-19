import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,

    // ✅ NEW
    reply: {
      type: String,
      default: "",
    },
    repliedAt: Date,
  },
  { timestamps: true }
);


export default mongoose.model("Contact", contactSchema);
