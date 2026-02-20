import express from "express";
import upload from "../middleware/Upload.js";
import { addResult, deleteResult, getAllResults } from "../controllers/cricketLeagueController.js";



const cricketrouter = express.Router();

/**
 * ADD CRICKET RESULT (with photos)
 */
cricketrouter.post(
  "/cricket",
  upload.array("photos", 10),
  addResult
);

/**
 * GET ALL CRICKET RESULTS
 */
cricketrouter.get("/cricket", getAllResults);

/**
 * DELETE CRICKET RESULT
 */
cricketrouter.delete("/cricket/:id", deleteResult);

export default cricketrouter;