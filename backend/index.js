import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import UserRouter from './routes/UserRouter.js';
import Festivalrouter from './routes/FestivalRoter.js';

import templerouter from './routes/TempleRouter.js';
import cricketrouter from './routes/cricketRoutes.js';
import aboutrouter from './routes/aboutRoutes.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.use("/",UserRouter)
app.use("/uploads", express.static("uploads"));
app.use("/festival", Festivalrouter);



app.use("/uploads", express.static("uploads"));
app.use("/api",templerouter );

app.use("/api/cricket", cricketrouter);

app.use("/api/about", aboutrouter);

const PORT= process.env.PORT||2000;
const URL= process.env.MONGOURL;

mongoose.connect(URL).then(()=>{
    console.log("DB is connected Successfully");
    app.listen(PORT,()=>{
        console.log("Server is running on PORT:"+PORT);
    })
}).catch(error=>console.log(error));

