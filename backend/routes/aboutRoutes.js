import express from "express";
import upload from "../middleware/upload.js";
import { addAbout, getAbout, deleteAbout } from "../controllers/aboutController.js";

const aboutrouter = express.Router();

aboutrouter.post("/", upload.array("photos", 10), addAbout);
aboutrouter.get("/", getAbout);
aboutrouter.delete("/:id", deleteAbout);

export default aboutrouter;
