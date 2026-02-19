import Festival from "../models/Festivel.js";

export const createFestival = async (req, res) => {
  try {
    const photos = req.files?.map(file => ({
      url: file.path,
    }));

    const festival = new Festival({
      festivalName: req.body.festivalName,
      festivalDate: req.body.festivalDate,
      description: req.body.description,
      photos,
    });

    await festival.save();
    res.status(201).json(festival);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFestivals = async (req, res) => {
  try {
    const festivals = await Festival.find().sort({ festivalDate: 1 });
    res.json(festivals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateFestival = async (req, res) => {
  try {
    const festival = await Festival.findById(req.params.id);
    if (!festival)
      return res.status(404).json({ message: "Festival not found" });

    festival.festivalName =
      req.body.festivalName || festival.festivalName;
    festival.festivalDate =
      req.body.festivalDate || festival.festivalDate;
    festival.description =
      req.body.description || festival.description;

    // Add new photos
    if (req.files && req.files.length > 0) {
      const newPhotos = req.files.map(file => ({
        url: file.path,
      }));
      festival.photos.push(...newPhotos);
    }

    await festival.save();
    res.json(festival);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFestivalPhoto = async (req, res) => {
  try {
    const { festivalId, photoId } = req.params;

    const festival = await Festival.findById(festivalId);
    if (!festival)
      return res.status(404).json({ message: "Festival not found" });

    festival.photos = festival.photos.filter(
      photo => photo._id.toString() !== photoId
    );

    await festival.save();
    res.json({ message: "Photo removed", festival });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFestival = async (req, res) => {
  try {
    await Festival.findByIdAndDelete(req.params.id);
    res.json({ message: "Festival deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
