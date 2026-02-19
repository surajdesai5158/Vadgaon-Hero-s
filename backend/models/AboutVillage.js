import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  title: String,
  description: String,
  photos: [
    {
      url: String
    }
  ]
}, { timestamps: true });

export default mongoose.model("AboutVillage", aboutSchema);
