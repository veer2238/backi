import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import detailroute from "./routes/detailroute.js"
import contactroute from "./routes/contactroute.js"
import Inquiryroute from "./routes/Inquiryroute.js"
import newsletterroute from  "./routes/newsletterroute.js"
import datas from "./routes/Api/data.js"
import faq from "./routes/Api/faq.js"
import reviews from "./routes/Api/reviews.js"


import path from "path";  // Ensure this is the path module
import { fileURLToPath } from "url";  // For static file serving
dotenv.config();
const app = express();

// // Static file serving (serves files from the uploads folder)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(express.json());

const DB = process.env.MONGODB_URL
mongoose
  .connect(DB)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("mongo error", err));

app.use('/', datas)
app.use('/',faq)
app.use('/', reviews)
app.use('/', contactroute)
app.use('/', detailroute)
app.use('/', Inquiryroute)
app.use('/', newsletterroute)





app.listen(3035, () => {
    console.log('Server connected');
  });