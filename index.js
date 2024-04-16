const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cron = require("node-cron");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const multer = require("multer");
const Razorpay = require("razorpay");

const route = require("./routes/route");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  "mongodb+srv://Avverma:Avverma95766@avverma.2g4orpk.mongodb.net/Hotel";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define your cron job logic
const cronJob = () => {
  // Your cron job logic here
  console.log("Cron job executed");
};

// Schedule the cron job to run every day at midnight (adjust as needed)
cron.schedule("0 0 * * *", cronJob);

// Allow requests only from specific origins
const allowedOrigins = ["http://localhost:3000", "https://hotel-backend-tge7.onrender.com", "http://localhost:5000"];
app.use(cors({
  origin: function(origin, callback) {
    // Check if the origin is allowed or if it's a request from the same origin (null)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = createServer(app);
const io = new Server(server);

app.use("/", route);

app.use((req, res) => {
  return res
    .status(400)
    .send({ status: false, message: "End point is incorrect" });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
