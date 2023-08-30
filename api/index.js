import express from 'express'
import { config } from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import userRoute from './routes/users.js'
import postRoute from './routes/posts.js'
import categoryRouter from './routes/categories.js'
import bodyParser from 'body-parser'
import multer from 'multer'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express() 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

// var allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// }
// app.use(allowCrossDomain);
app.use(cors())
app.use("/images",express.static(path.join(__dirname+"\\images")))
console.log(path.join(__dirname+"\\images"))
config()
mongoose 
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB")) 
  .catch((err) => console.log(err));

  
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null,req.body.name);
  },
});

const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use(express.json()) 
app.use(bodyParser.urlencoded({extended:false}))
app.use("/api/auth", authRoute);
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/categories",categoryRouter)

app.get("/",(req,res)=>{  
    res.send("Hello World")
})

app.listen(4000,()=>{
    console.log("Server is running")
})    