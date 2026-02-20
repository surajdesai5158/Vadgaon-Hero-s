import express from "express";
import upload from "../middleware/Upload.js";
import { createFestival, deleteFestival, deleteFestivalPhoto, getFestivals, updateFestival } from "../controllers/FestivelController.js";


const Festivalrouter = express.Router();

/**
 * CREATE FESTIVAL (with photos)
 */
Festivalrouter.post(
  "/festival",
  upload.array("photos", 15),
  createFestival
);

/**
 * GET ALL FESTIVALS
 */
Festivalrouter.get("/festival", getFestivals);

/**
 * UPDATE FESTIVAL
 */
Festivalrouter.put(
  "/festival/:id",
  upload.array("photos", 15),
  updateFestival
);

/**
 * DELETE FESTIVAL
 */
Festivalrouter.delete("/festival/:id", deleteFestival);

/**
 * DELETE SINGLE FESTIVAL PHOTO
 */
Festivalrouter.delete(
  "/festival/:festivalId/photo/:photoId",
  deleteFestivalPhoto
);

export default Festivalrouter;