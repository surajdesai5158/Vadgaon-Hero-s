import express from "express";
import upload from "../middleware/Upload.js";
import { addResult, getAllResults, deleteResult } from "../controllers/cricketController.js";

const cricketrouter = express.Router();

cricketrouter.post("/add", upload.array("photos", 10), addResult);
cricketrouter.get("/all", getAllResults);
cricketrouter.delete("/delete/:id", deleteResult);

export default cricketrouter;
