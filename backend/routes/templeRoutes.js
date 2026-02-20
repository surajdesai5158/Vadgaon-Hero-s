import express from "express";
import upload from "../middleware/Upload.js";
import { addTemple, deleteTemple, getTemples } from "../controllers/templeController.js";


const templerouter = express.Router();

/**
 * ADD TEMPLE (with photos)
 */
templerouter.post(
  "/temple",
  upload.array("photos", 10), // field name must match frontend
  addTemple
);

/**
 * GET ALL TEMPLES
 */
templerouter.get("/temple", getTemples);

/**
 * DELETE TEMPLE
 */
templerouter.delete("/temple/:id", deleteTemple);

export default templerouter;