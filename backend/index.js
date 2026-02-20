import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import UserRouter from "./routes/UserRouter.js";


import cricketrouter from "./routes/cricketRoutes.js";
import aboutrouter from "./routes/aboutRoutes.js";
import Festivalrouter from "./routes/festivalRoutes.js";
import templerouter from "./routes/templeRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://vadgaon-hero-s.vercel.app"],
    credentials: true,
  })
);


app.use("/", UserRouter);
app.use("/festival", Festivalrouter);
app.use("/api", templerouter);
app.use("/api/cricket", cricketrouter);
app.use("/api/about", aboutrouter);

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 2000;
const URL = process.env.MONGOURL;

mongoose.connect(URL)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () =>
      console.log("Server running on port", PORT)
    );
  })
  .catch(err => console.log(err));
