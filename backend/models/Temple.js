import mongoose from "mongoose";

const templeSchema = new mongoose.Schema({
  templeName: String,
  location: String,
  establishedYear: Number,
  description: String,
  photos: [
    {
      url: String   // stored file path
    }
  ]
}, { timestamps: true });

export default mongoose.model("Temple", templeSchema);
