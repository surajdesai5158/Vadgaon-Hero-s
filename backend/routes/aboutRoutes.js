import express from "express";
import upload from "../middleware/Upload.js";
import { addAbout, deleteAbout, getAbout } from "../controllers/aboutController.js";


const aboutrouter = express.Router();

/**
 * ADD ABOUT VILLAGE (with photos)
 */
aboutrouter.post(
  "/about",
  upload.array("photos", 10), // field name must match frontend
  addAbout
);

/**
 * GET ALL ABOUT RECORDS
 */
aboutrouter.get("/about", getAbout);

/**
 * DELETE ABOUT RECORD
 */
aboutrouter.delete("/about/:id", deleteAbout);

export default aboutrouter;