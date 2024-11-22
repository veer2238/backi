import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import detailroute from "./routes/detailroute.js"
import contactroute from "./routes/contactroute.js"
import datas from "./routes/Api/data.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const DB = process.env.MONGODB_URL
mongoose
  .connect(DB)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("mongo error", err));

app.use('/', datas)
app.use('/', contactroute)
app.use('/', detailroute)


app.listen(3035, () => {
    console.log('Server connected');
  });