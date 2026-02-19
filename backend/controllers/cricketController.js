import CricketLeague from "../models/CricketLeague.js";
import fs from "fs";


// ADD RESULT
export const addResult = async (req, res) => {
  try {

    const photoFiles = req.files.map(file => file.filename);

    const newResult = new CricketLeague({
      year: req.body.year,
      winnerTeam: req.body.winnerTeam,
      winnerOwner: req.body.winnerOwner,
      runnerTeam: req.body.runnerTeam,
      runnerOwner: req.body.runnerOwner,
      photos: photoFiles
    });

    await newResult.save();

    res.json({ message: "Result Added Successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET ALL
export const getAllResults = async (req, res) => {
  const results = await CricketLeague.find().sort({ year: -1 });
  res.json(results);
};



// DELETE RESULT + PHOTOS
export const deleteResult = async (req, res) => {
  try {
    const result = await CricketLeague.findById(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }

    // delete photos from uploads folder
    result.photos.forEach(photo => {
      const path = `uploads/${photo}`;
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
      }
    });

    await CricketLeague.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted Successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
