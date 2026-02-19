import mongoose from "mongoose";

const festivalSchema = new mongoose.Schema(
  {
    festivalName: {
      type: String,
      required: true,
    },

    festivalDate: {
      type: Date,
      required: true,
    },

    photos: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],

    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("Festival", festivalSchema);
