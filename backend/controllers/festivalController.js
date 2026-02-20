import Festival from "../models/Festivel.js";

/**
 * CREATE FESTIVAL
 */
export const createFestival = async (req, res) => {
  try {
    const photos = req.files
      ? req.files.map(file => ({
          url: file.path, // ✅ Cloudinary URL
        }))
      : [];

    const festival = await Festival.create({
      festivalName: req.body.festivalName,
      festivalDate: req.body.festivalDate,
      description: req.body.description,
      photos,
    });

    res.status(201).json({
      message: "Festival created successfully",
      data: festival,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL FESTIVALS
 */
export const getFestivals = async (req, res) => {
  try {
    const festivals = await Festival.find().sort({ festivalDate: 1 });
    res.status(200).json(festivals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE FESTIVAL
 */
export const updateFestival = async (req, res) => {
  try {
    const festival = await Festival.findById(req.params.id);

    if (!festival) {
      return res.status(404).json({ message: "Festival not found" });
    }

    festival.festivalName =
      req.body.festivalName || festival.festivalName;
    festival.festivalDate =
      req.body.festivalDate || festival.festivalDate;
    festival.description =
      req.body.description || festival.description;

    // ✅ Add new Cloudinary images
    if (req.files && req.files.length > 0) {
      const newPhotos = req.files.map(file => ({
        url: file.path,
      }));
      festival.photos.push(...newPhotos);
    }

    await festival.save();

    res.status(200).json({
      message: "Festival updated successfully",
      data: festival,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE SINGLE FESTIVAL PHOTO (DB ONLY)
 */
export const deleteFestivalPhoto = async (req, res) => {
  try {
    const { festivalId, photoId } = req.params;

    const festival = await Festival.findById(festivalId);
    if (!festival) {
      return res.status(404).json({ message: "Festival not found" });
    }

    festival.photos = festival.photos.filter(
      photo => photo._id.toString() !== photoId
    );

    await festival.save();

    res.status(200).json({
      message: "Photo removed successfully",
      data: festival,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE FESTIVAL (Cloudinary-safe)
 */
export const deleteFestival = async (req, res) => {
  try {
    const festival = await Festival.findById(req.params.id);

    if (!festival) {
      return res.status(404).json({ message: "Festival not found" });
    }

    // ✅ Only delete DB record (no fs, no uploads)
    await Festival.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Festival deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};