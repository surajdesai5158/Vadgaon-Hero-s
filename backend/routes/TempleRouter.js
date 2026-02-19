import express from "express";
import upload from "../middleware/UploadTemplePhotos.js";
import { addTemple, deleteTemple, getTemples } from "../controllers/TempleController.js";

const templerouter = express.Router();

templerouter.post("/temple", upload.array("photos", 10), addTemple);
templerouter.get("/temple", getTemples);
templerouter.delete("/temple/:id", deleteTemple);



export default templerouter;
