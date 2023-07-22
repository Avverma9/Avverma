const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const multer = require("multer");
const Razorpay = require("razorpay");

const route = require("./routes/route.js")
// const emailController = require("./controllers/emailController");

const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  "mongodb+srv://Avverma:Avverma95766@avverma.2g4orpk.mongodb.net/Hotel";



mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


  app.use("/", route);
  // app.use("/", emailController)
  

  app.use((req, res) => {
      return res.status(400).send({ status: false, message: "End point is incorrect" })
  });


  
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));