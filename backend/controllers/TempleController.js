import Temple from "../models/Temple.js";

/**
 * ADD TEMPLE
 */
export const addTemple = async (req, res) => {
  try {
    // safety check
    const photos = req.files
      ? req.files.map(file => ({
          url: file.path, // ✅ Cloudinary URL
        }))
      : [];

    const temple = await Temple.create({
      templeName: req.body.templeName,
      location: req.body.location,
      establishedYear: req.body.establishedYear,
      description: req.body.description,
      photos,
    });

    res.status(201).json({
      message: "Temple added successfully",
      data: temple,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL TEMPLES
 */
export const getTemples = async (req, res) => {
  try {
    const temples = await Temple.find().sort({ createdAt: -1 });
    res.status(200).json(temples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE TEMPLE (Cloudinary-safe)
 */
export const deleteTemple = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({ message: "Temple not found" });
    }

    // ✅ ONLY delete DB record (Cloudinary images stay)
    await Temple.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Temple deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};