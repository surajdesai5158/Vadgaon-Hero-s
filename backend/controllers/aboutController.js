import AboutVillage from "../models/AboutVillage.js";
import fs from "fs";


// ADD ABOUT
export const addAbout = async (req, res) => {
  try {
    const photos = req.files.map(file => ({
      url: file.path
    }));

    const newAbout = new AboutVillage({
      title: req.body.title,
      description: req.body.description,
      photos
    });

    await newAbout.save();

    res.json({ message: "About Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL
export const getAbout = async (req, res) => {
  const data = await AboutVillage.find().sort({ createdAt: -1 });
  res.json(data);
};




// DELETE ABOUT RECORD
export const deleteAbout = async (req, res) => {
  try {
    const about = await AboutVillage.findById(req.params.id);

    if (!about) {
      return res.status(404).json({ message: "Record not found" });
    }

    // delete photos from uploads folder
    about.photos.forEach(photo => {
      const path = photo.url;  // saved file path
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
      }
    });

    await AboutVillage.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted Successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
