import Temple from '../models/Temple.js';
import fs from "fs";


export const addTemple = async (req, res) => {
  try {
    const { templeName, location, establishedYear, description } = req.body;

    const photos = req.files.map((file) => ({
      url: file.path,
    }));

    const temple = new Temple({
      templeName,
      location,
      establishedYear,
      description,
      photos,
    });

    await temple.save();
    res.status(201).json({ message: "Temple added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 export const getTemples = async (req, res) => {
  try {
    const temples = await Temple.find().sort({ createdAt: -1 });
    res.json(temples);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





// DELETE TEMPLE + PHOTOS
export const deleteTemple = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({ message: "Temple not found" });
    }

    // delete photos from uploads folder
    temple.photos.forEach(photo => {
      const path = photo.url;   // stored path like uploads/abc.jpg
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
      }
    });

    await Temple.findByIdAndDelete(req.params.id);

    res.json({ message: "Temple deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

