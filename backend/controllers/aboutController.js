import AboutVillage from "../models/AboutVillage.js";

/**
 * ADD ABOUT VILLAGE
 */
export const addAbout = async (req, res) => {
  try {
    const photos = req.files
      ? req.files.map(file => ({
          url: file.path, // ✅ Cloudinary URL
        }))
      : [];

    const newAbout = await AboutVillage.create({
      title: req.body.title,
      description: req.body.description,
      photos,
    });

    res.status(201).json({
      message: "About added successfully",
      data: newAbout,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL ABOUT RECORDS
 */
export const getAbout = async (req, res) => {
  try {
    const data = await AboutVillage.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE ABOUT RECORD (Cloudinary-safe)
 */
export const deleteAbout = async (req, res) => {
  try {
    const about = await AboutVillage.findById(req.params.id);

    if (!about) {
      return res.status(404).json({ message: "Record not found" });
    }

    // ✅ Only delete DB record
    await AboutVillage.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};