import mongoose from "mongoose";

const cricketSchema = new mongoose.Schema({
  year: Number,
  winnerTeam: String,
  winnerOwner: String,
  runnerTeam: String,
  runnerOwner: String,
  photos: [String]   // multiple images
}, { timestamps: true });

export default mongoose.model("CricketLeague", cricketSchema);
