import express from "express";
import upload from "../middleware/Upload.js";
import {
  createFestival,
  getFestivals,
  updateFestival,
  deleteFestival,
  deleteFestivalPhoto,
} from "../controllers/FestivelController.js";

const Festivalrouter = express.Router();

Festivalrouter.post("/create", upload.array("photos", 15), createFestival);
Festivalrouter.get("/", getFestivals);
Festivalrouter.put("/:id", upload.array("photos", 15), updateFestival);
Festivalrouter.delete("/:id", deleteFestival);
Festivalrouter.delete("/:festivalId/photo/:photoId", deleteFestivalPhoto);

export default Festivalrouter;
