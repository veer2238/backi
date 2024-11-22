import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import detailroute from "./routes/detailroute.js"
import contactroute from "./routes/contactroute.js"
import Inquiryroute from "./routes/Inquiryroute.js"
import newsletterroute from "./routes/newsletterroute.js"
import razorpayroute from "./routes/razorpayroute.js"
import datas from "./routes/Api/data.js"
import faq from "./routes/Api/faq.js"
import reviews from "./routes/Api/reviews.js"

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
app.use('/',faq)
app.use('/', reviews)
app.use('/', contactroute)
app.use('/', detailroute)
app.use('/', Inquiryroute)
app.use('/', newsletterroute)
app.use('/', razorpayroute)



app.listen(3035, () => {
    console.log('Server connected');
  });