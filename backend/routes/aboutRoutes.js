import express from "express";
// import upload from "../middleware/upload.js";
import { addAbout, getAbout, deleteAbout } from "../controllers/aboutController.js";

const aboutrouter = express.Router();

// TEMP FIX: remove upload middleware
aboutrouter.post("/", addAbout);
aboutrouter.get("/", getAbout);
aboutrouter.delete("/:id", deleteAbout);

export default aboutrouter;
