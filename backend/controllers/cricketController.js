import CricketLeague from "../models/CricketLeague.js";

/**
 * ADD RESULT
 */
export const addResult = async (req, res) => {
  try {
    const photos = req.files
      ? req.files.map(file => ({
          url: file.path, // ✅ Cloudinary URL
        }))
      : [];

    const newResult = await CricketLeague.create({
      year: req.body.year,
      winnerTeam: req.body.winnerTeam,
      winnerOwner: req.body.winnerOwner,
      runnerTeam: req.body.runnerTeam,
      runnerOwner: req.body.runnerOwner,
      photos,
    });

    res.status(201).json({
      message: "Result added successfully",
      data: newResult,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL RESULTS
 */
export const getAllResults = async (req, res) => {
  try {
    const results = await CricketLeague.find().sort({ year: -1 });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE RESULT (Cloudinary-safe)
 */
export const deleteResult = async (req, res) => {
  try {
    const result = await CricketLeague.findById(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    // ✅ Only delete DB record
    await CricketLeague.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Result deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};