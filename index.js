const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const multer = require("multer");

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  "mongodb+srv://Avverma:Avverma95766@avverma.2g4orpk.mongodb.net/Hotel";
const AWS_BUCKET_NAME = "classroom-training-bucket";
const AWS_ACCESS_KEY_ID = "AKIAY3L35MCRZNIRGT6N";
const AWS_SECRET_ACCESS_KEY = "9f+YFBVcSjZWM6DG9R4TUN8k8TGe4X+lXmO4jPiU";
const AWS_REGION = "ap-south-1"; // Update this to the appropriate region for your S3 bucket
const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_BUCKET_NAME,
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."));
    }
  },
}).array("images", 10);
// ===============================================user Schema========================================================//
const UserSchema = new mongoose.Schema({
  name: { type: String, required: false },
  address: { type: String, required: false },
  email: { type: String, required: false, unique: true },
  mobile: { type: String, required: false },
  password: { type: String, required: false },
  images: { type: [String], required: false },
});

const signUp = mongoose.model("user", UserSchema);
//========================================//POST USER //====================================================================
app.post("/signup", upload, async (req, res) => {
  const { name, address, email, mobile, password } = req.body;
  const images = req.files.map((file) => file.location);
  const user = new signUp({ name, address, email, mobile, password, images });
  await user.save();
  io.emit("recordAdded", user);
  res.json(user);
});
//========================================GET USER DETAILS===============================================================//
app.get("/get/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await signUp.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//=============================================SIGN IN===============================================================//
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await signUp.findOne({ email });

    // Check if user exists and compare passwords
    if (user && user.password === password) {
      res.json({ message: "Sign-in successful", userId: user._id });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//=======================================welcome schema=================================================//
const welcomeSchema = new mongoose.Schema({
  images: { type: [String], required: false },
});
const welcome = mongoose.model("welcome", welcomeSchema);
//========================================post welocome================================================//
app.post("/welcome", upload, async (req, res) => {
  const images = req.files.map((file) => file.location);
  const user = new welcome({ images });
  await user.save();
  io.emit("recordAdded", user);
  res.json(user);
});
//=======================================get welcome=====================================================//
app.get("/welcome/get", async (req, res) => {
  const user = await welcome.find();
  res.json(user);
});
//====================================================DEMO HOTELS=================================================================//

//====================homehotel=============================================================//

const hotelSchema = new mongoose.Schema({
  images: { type: [String], required: false },
  name: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
    min: 1,
    max: 10,
  },
  ratingLabel: {
    type: String,
    required: false,
  },
  review: {
    type: String,
    required: false,
  },
});

const Hotel = mongoose.model("Hotel", hotelSchema);

//===============
app.post("/hotel", upload, async (req, res) => {
  try {
    const { name, location, rating, review } = req.body;
    const images = req.files.map((file) => file.location);

    if (rating < 1 || rating > 10) {
      return res.status(400).json({ error: "Rating must be between 1 and 10" });
    }

    let ratingLabel;
    if (rating < 5) {
      ratingLabel = "Bad";
    } else if (rating > 5) {
      ratingLabel = "Good";
    } else {
      ratingLabel = "Average";
    }
    // Create a new hotel document
    const hotel = new Hotel({
      images: images,
      name: name,
      location: location,
      rating: rating,
      review: review,
    });

    // Save the hotel document to the database
    await hotel.save();

    res.status(201).json({
      message: "Hotel inserted successfully",
      hotel: hotel,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error inserting hotel",
      error: error.message,
    });
  }
});
//=========Get All Hotel
app.get("/get/all/hotels", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving hotels",
      error: error.message,
    });
  }
});
//===============================================================================================================

const complaintSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "approved", "rejected"],
  },
  complaintDescription: { type: String, required: true },
});

const complaint = mongoose.model("complaint", complaintSchema);

app.post("/complaint/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { complaintDescription } = req.body;
    if (id != undefined) {
      const existingComplaint = await complaint.findOne({ id });
      if (existingComplaint) {
        existingComplaint.complaintDescription = complaintDescription;
        await existingComplaint.save();
        return res.status(200).json({
          status: 200,
          success: true,
          message: "complaint successfully updated ",
        });
      } else {
        const newComplaint = await complaint.create({
          userId: id,
          complaintDescription: complaintDescription,
          status: "pending",
        });
        return res.status(200).json({
          status: 200,
          success: true,
          message: "complaint created ",
        });
      }
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "please provide id in correct way ",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: " something went wrong",
      error: error.message,
    });
  }
});

app.patch("/updateProfile", async (req, res) => {
  try {
    const { id } = req.query;
    const { name, address, email, mobile, password, newPassword } = req.body;

    const existingUser = await signUp.findById(id);
    if (existingUser) {
      if (existingUser.password === password) {
        const updatedUser = await signUp.findByIdAndUpdate(id, {
          name,
          email,
          mobile,
          password: newPassword,
          address,
        });
        return res.status(200).json({
          status: 200,
          success: true,
          message: "profile updated successfully",
        });
      } else {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "password does not match",
        });
      }
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "this user does not exist ",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: " something went wrong",
      error: error.message,
    });
  }
});

app.patch("/approveComplaint/", async (req, res) => {
  try {
    const { id } = req.query;
    const { status } = req.body;
    if (id != undefined) {
      const existingUser = await complaint.findByIdAndUpdate(id, {
        status: status,
      });
      if (existingUser) {
        let message;
        if (status === "approved") {
          message = "complaint is approved";
        } else if (status === "rejected") {
          message = "complaint is rejected";
        } else {
          message = "complaint is pending";
        }
        return res.status(200).json({
          status: 200,
          success: true,
          message: message,
        });
      } else {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "unable to find user",
        });
      }
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "please provide valid id",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: " something went wrong",
      error: error.message,
    });
  }
});
app.get("/getAllUser/user", async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const user = await signUp.findById(id);
      if (user) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: " user by id",
          data: user,
        });
      } else {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "unable to find user by id",
        });
      }
    } else {
      const user = await signUp.find();
      if (user) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "all users",
          data: user,
        });
      } else {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "unable to find users",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: " something went wrong",
      error: error.message,
    });
  }
});

app.get("/complaints/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const complaints = await complaint.find({ userId });

    if (complaints.length > 0) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Complaints by userId",
        data: complaints,
      });
    } else {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "No complaints found for the provided userId",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

//================================= HOTEL BOOKING
//====SCHEMA

const hotelBookingSchema = new mongoose.Schema({
  images: { type: [String], required: false },
  hotelName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  room: {
    type: Number,
    required: true,
  },
  guest: {
    type: Number,
    required: true,
    min: 1,
  },
  roomPrice: {
    type: Number,
    default: 700,
    required: true,
  },
  totalRoomPrice: {
    type: Number,
    required: true,
  },
  petAllowed: {
    type: Boolean,
    default: false,
  },
  localId: {
    type: Boolean,
    default: false,
  },
  maritalStatus: {
    type: String,
    requried: true,
    enum: ["Single", "Married", "Married,Single"],
  },
  alcoholAllowed: {
    type: Boolean,
    default: false,
  },
  bachelorAllowed: {
    type: Boolean,
    default: false,
  },
});

const HotelBooking = mongoose.model("HotelBooking", hotelBookingSchema);

//========POST API
app.post("/hotel/book", upload, async (req, res) => {
  try {
    const {
      hotelName,
      startDate,
      endDate,
      room,
      guest,
      petAllowed,
      localId,
      maritalStatus,
      alcoholAllowed,
      bachelorAllowed,
    } = req.body;
    const images = req.files.map((file) => file.location);
    // Validate startDate
    const startDateRegex =
      /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(20|24)\d{2}$/;
    if (!startDate || !startDate.match(startDateRegex)) {
      return res
        .status(400)
        .json({ error: "Invalid startDate. Must be in MM-DD-YYYY format." });
    }

    // Validate endDate
    const endDateRegex =
      /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(20|24)\d{2}$/;
    if (!endDate || !endDate.match(endDateRegex)) {
      return res
        .status(400)
        .json({ error: "Invalid endDate. Must be in MM-DD-YYYY format." });
    }

    // Calculate roomPrice based on room count
    let pricePerRoom = 700;
    if (room >= 1) {
      totalRoomPrice = room * 700;
    } else {
      res.status(400).send({ status: false, message: "Room field is invalid" });
    }

    const hotelBooking = new HotelBooking({
      images,
      hotelName,
      startDate,
      endDate,
      room,
      guest,
      totalRoomPrice,
      petAllowed,
      localId,
      maritalStatus,
      alcoholAllowed,
      bachelorAllowed,
    });
    await hotelBooking.save();
    res.status(201).json({
      message: "Hotel booked successfully",
      hotelBooking: hotelBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in booking hotel",
      error: error.message,
    });
  }
});

//=============GET HOTEL BOOKINGS
app.get("/hotel/bookings", async (req, res) => {
  try {
    // Retrieve all hotel bookings
    const bookings = await HotelBooking.find();

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//==========GET HOTEL BOOKINGS BY FILTER
app.get("/hotel/booking", async (req, res) => {
  try {
    const {
      hotelName,
      startDate,
      endDate,
      room,
      guest,
      totalRoomPrice,
      petAllowed,
      localId,
      maritalStatus,
      alcoholAllowed,
      bachelorAllowed,
    } = req.query;

    const query = {};

    if (hotelName) {
      query.hotelName = hotelName;
    }
    if (startDate) {
      query.startDate = startDate;
    }
    if (endDate) {
      query.endDate = endDate;
    }
    if (room) {
      query.room = room;
    }
    if (guest) {
      query.guest = guest;
    }
    if (totalRoomPrice) {
      query.totalRoomPrice = totalRoomPrice;
    }
    if (petAllowed) {
      query.petAllowed = petAllowed;
    }
    if (localId) {
      query.localId = localId;
    }
    if (maritalStatus) {
      query.maritalStatus = maritalStatus;
    }
    if (alcoholAllowed) {
      query.alcoholAllowed = alcoholAllowed;
    }
    if (bachelorAllowed) {
      query.bachelorAllowed = bachelorAllowed;
    }

    const bookings = await HotelBooking.find(query);

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//UPDATE ROOM BOOKING
// PUT route for updating hotel booking

app.put("/hotel/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { room, guest } = req.body;

    if (!room || !guest) {
      return res
        .status(400)
        .json({ error: "Room and guest values are required for updating." });
    }

    const booking = await HotelBooking.findById(id);

    if (!booking) {
      return res.status(404).json({ error: "Hotel booking not found." });
    }

    booking.room = room;
    booking.guest = guest;

    booking.totalRoomPrice = booking.roomPrice * booking.room;
    const updatedBooking = await booking.save();

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//======================================Search Hotel=====================================================================//
const searchSchema = new mongoose.Schema({
  images: [String],
  destination: String,
  hotelName: String,
  startDate: Date,
  endDate: Date,
  guests: {
    type: Number,
    required: true,
    min: 1,
  },
  numRooms: Number,
  price: {
    type: Number,
    default: 1000,
  },
  newPrice: {
    type: Number,
  },
  localId: Boolean,
  maritalStatus: String,
  moreOptions: [String],
  amenties: [String],
  rating: Number,
  review: String,
});

const Search = mongoose.model("Search", searchSchema);

app.post("/post/hotel/search", upload, async (req, res) => {
  const {
    destination,
    hotelName,
    guests,
    startDate,
    endDate,
    numRooms,
    localId,
    maritalStatus,
    moreOptions,
    amenties,
    rating,
    review,
  } = req.body;
  const images = req.files.map((file) => file.location);
 
  // Calculate roomPrice based on room count
  let pricePerRoom = 1000;
  if (numRooms >= 1) {
    newPrice = numRooms * 1000;
  } else {
    res.status(400).send({ status: false, message: "Room field is invalid" });
  }
  const search = new Search({
    images,
    destination,
    hotelName,
    startDate,
    endDate,
    guests,
    numRooms,
    newPrice,
    localId,
    maritalStatus,
    moreOptions,
    amenties,
    rating,
    review,
  });
  await search.save();
  io.emit("recordAdded", search);
  res.json(search);
});

//===============================================Search by query============================================//
app.get("/get/hotel/search", async (req, res) => {
  try {
    const {
      destination,
      startDate,
      endDate,
      guests,
      numRooms,
      localId,
      maritalStatus,
      moreOptions,
    } = req.query;

    const query = {};

    if (destination) {
      query.destination = destination;
    }
    if (startDate) {
      query.startDate = startDate;
    }
    if (endDate) {
      query.endDate = endDate;
    }
    if (guests) {
      query.guests = guests;
    }
    if (numRooms) {
      query.numRooms = numRooms;
    }
    if (localId) {
      query.localId = localId;
    }
    if (maritalStatus) {
      query.maritalStatus = maritalStatus;
    }
    if (moreOptions) {
      query.moreOptions = moreOptions;
    }

    const searchHotel = await Search.find(query);

    if (searchHotel.length == 0) {
      return res
        .status(404)
        .json({ message: "No hotels found with the given filters." });
    }

    res.status(200).json(searchHotel);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});
//=============================================Search By hotelName==================================================================//
app.get("/hotelDestination", async (req, res) => {
  const { destination } = req.query;

  try {
    const hotelDestination = await Search.find({ destination });

    if (hotelDestination.length === 0) {
      return res
        .status(404)
        .json({ error: "No hotels found with the given hotelName." });
    }

    res.status(200).json(hotelDestination);
  } catch (error) {
    console.error("Error retrieving hotels:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});
//============================payment==========================================//
const razorpay = new Razorpay({
  key_id: " rzp_test_CE1nBQFs6SwXnC",
  key_secret: "PTYR3RDbVaNrpkmRqMhX7CKA",
});

// payment schema
const paymentSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotels",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: "INR",
  },
  status: {
    type: String,
    enum: ["created", "processed", "completed", "failed"],
    default: "created",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

//==PAYMENT API==============================
app.post("/api/payments", async (req, res) => {
  try {
    const { hotelId, userId, amount, currency } = req.body;

    const options = {
      amount: amount * 100,
      currency,
      receipt: "razorUser@gmail.com",
    };

    const payment = new Payment({
      hotelId,
      userId,
      amount,
      currency,
    });

    await payment.save();

    res.json({
      success: true,
      payment: {
        hotelId: payment.hotelId,
        userId: payment.userId,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        createdAt: payment.createdAt,
      },
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    res.status(500).json({ error: "Failed to create payment" });
  }
});
//===============================================================================================================//
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
