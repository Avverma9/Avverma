const hotelModel = require("../../models/Hotel/hotelModel");
const foods = require("../../models/Hotel/foodsModel");
const amenities = require("../../models/Hotel/amenitiesModel");
const policies = require("../../models/Hotel/policyModel");
const month = require("../../models/monthlyPriceModel");
const roomModel = require("../../models/Hotel/roomModel");
const reviewModel = require("../reviewController");
const cron = require("node-cron");
const createHotel = async (req, res) => {
  try {
    const {
      hotelName,
      description,
      hotelOwnerName,
      destination,
      price,
      isOffer,
      startDate,
      endDate,
      state,
      city,
      landmark,
      pinCode,
      numRooms,
      reviews,
      rating,
      starRating,
      propertyType,
      contact,
      isAccepted,
      salesManagerContact,
      localId,
      hotelEmail,
      customerWelcomeNote,
      generalManagerContact,
    } = req.body;

    const images = req.files.map((file) => file.location);

    const hotelData = {
      hotelName,
      description,
      hotelOwnerName,
      destination,
      price,
      isOffer,
      customerWelcomeNote,
      startDate,
      endDate,
      state,
      city,
      landmark,
      pinCode,
      numRooms,
      reviews,
      rating,
      starRating,
      propertyType,
      contact,
      isAccepted,
      localId,
      hotelEmail,
      generalManagerContact,
      salesManagerContact,
      images,
    };

    const savedHotel = await hotelModel.create(hotelData);

    return res.status(201).json({
      message: `Your request is accepted. Kindly note your hotel id (${savedHotel.hotelId}) for future purposes.`,
      status: true,
      data: savedHotel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//=================================Count of hotel=============================
const getCount = async function (req, res) {
  try {
    const count = await hotelModel.countDocuments({ isAccepted: true });
    res.json(count);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//==========================================================================

const getCountPendingHotels = async function (req, res) {
  try {
    const count = await hotelModel.countDocuments({ isAccepted: false });
    console.log("Count of pending hotels:", count);
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error while getting count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//=================================GET HOTEL=================

//==================================UpdateHotel================================
const UpdateHotel = async function (req, res) {
  const { hotelId } = req.params;
  const { isAccepted, isOffer } = req.body;

  try {
    const updateDetails = await hotelModel.findOneAndUpdate(
      { hotelId: hotelId }, // Use hotelId for querying
      { $set: { isAccepted: isAccepted, isOffer: isOffer } }, // Update fields
      { new: true } // To return the updated document
    );

    res.json(updateDetails);
  } catch (error) {
    console.error("Error updating hotel:", error);
    res.status(500).json({ error: "Failed to update hotel details." });
  }
};

//================================update hotel info =================================================
const UpdateHotelInfo = async function (req, res) {
  const { hotelId } = req.params;
  const {
    isAccepted,
    isOffer,
    hotelName,
    hotelOwnerName,
    hotelEmail,
    localId,
    description,
    customerWelcomeNote,
    generalManagerContact,
    salesManagerContact,
    landmark,
    pinCode,
    propertyType,
    starRating,
    city,
    state,
  } = req.body;

  try {
    const updateDetails = await hotelModel.findOneAndUpdate(
      { hotelId: hotelId }, // Use hotelId for querying
      {
        $set: {
          isAccepted: isAccepted,
          isOffer: isOffer,
          hotelName: hotelName,
          hotelOwnerName: hotelOwnerName,
          hotelEmail: hotelEmail,
          generalManagerContact: generalManagerContact,
          salesManagerContact: salesManagerContact,
          landmark: landmark,
          pinCode: pinCode,
          propertyType: propertyType,
          starRating: starRating,
          city: city,
          state: state,
          localId: localId,
          description: description,
          customerWelcomeNote: customerWelcomeNote,
        },
      }, // Update fields
      { new: true } // To return the updated document
    );

    res.json(updateDetails);
  } catch (error) {
    console.error("Error updating hotel:", error);
    res.status(500).json({ error: "Failed to update hotel details." });
  }
};

//=======================================add room=====================================
const increaseRoomToHotel = async function (req, res) {
  const { id } = req.params;
  const addRoom = await hotelModel.findById(id);
  addRoom.numRooms += 1;
  addRoom.roomDetails.countRooms += 1;
  const updatedRoom = await addRoom.save();
  res.json(updatedRoom);
};
//====================================================================================
const decreaseRoomToHotel = async function (req, res) {
  const { id } = req.params;
  const addRoom = await hotelModel.findById(id);
  addRoom.numRooms -= 1;
  addRoom.roomDetails.countRooms -= 1;
  const updatedRoom = await addRoom.save();
  res.json(updatedRoom);
};
//=============================get hotel by amenities===========================//
const getByQuery = async (req, res) => {
  const {
    amenities,
    bedTypes,
    starRating,
    propertyType,
    hotelOwnerName,
    hotelEmail,
    roomTypes,
  } = req.query;

  // Check if there are no query parameters
  if (
    !amenities &&
    !bedTypes &&
    !starRating &&
    !propertyType &&
    !hotelOwnerName &&
    !hotelEmail &&
    !roomTypes
  ) {
    // Fetch all data where isAccepted is true
    const allData = await hotelModel.find({ isAccepted: true });
    res.json(allData);
    return;
  }

  const queryParameters = [
    { key: "amenities", value: amenities },
    { key: "roomDetails.bedTypes", value: bedTypes },
    { key: "starRating", value: starRating },
    { key: "propertyType", value: propertyType },
    { key: "hotelOwnerName", value: hotelOwnerName },
    { key: "hotelEmail", value: hotelEmail },
    { key: "roomDetails.type", value: roomTypes },
  ];

  let fetchedData = [];

  for (const param of queryParameters) {
    if (param.value) {
      const query = {};

      if (param.key.includes("roomDetails")) {
        const elemMatchQuery = {};
        if (param.key.endsWith("countRooms")) {
          // Check countRooms greater than 0
          elemMatchQuery[param.key.split(".")[1]] = { $gt: 0 };
        } else {
          elemMatchQuery[param.key.split(".")[1]] = Array.isArray(param.value)
            ? { $in: param.value.map((val) => new RegExp(val, "i")) }
            : new RegExp(param.value, "i");
        }

        query["roomDetails"] = { $elemMatch: elemMatchQuery };
      } else {
        query[param.key] = Array.isArray(param.value)
          ? { $in: param.value.map((val) => new RegExp(val, "i")) }
          : new RegExp(param.value, "i");
      }

      // Add check for isAccepted
      query["isAccepted"] = true;

      fetchedData = await hotelModel.find(query);

      if (fetchedData.length > 0) {
        break; // Exit the loop if data is found
      }
    }
  }

  res.json(fetchedData);
};

//================================================================================================

const getAllHotels = async (req, res) => {
  try {
    const getData = await hotelModel.find().sort({ isAccepted: 1 });

    res.json({ success: true, data: getData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
//====================================================================================
const getAllRejectedHotels = async (req, res) => {
  try {
    const hotels = await hotelModel.find().sort({ createdAt: -1 });
    const hotelsData = hotels.filter(
      (accepted) => accepted.isAccepted === false
    );
    res.json(hotelsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//===========================get hotels====================================================//
const getHotels = async (req, res) => {
  const hotels = await hotelModel.find().sort({ createdAt: -1 });
  const filterData = hotels.filter((hotel) => hotel.isOffer === false);
  res.json(filterData);
};
//======================================get offers==========================================//
const getOffers = async (req, res) => {
  const hotels = await hotelModel.find().sort({ createdAt: -1 });
  const filterData = hotels.filter((hotel) => hotel.isOffer === true);
  res.json(filterData);
};
//============================get by city============================================//
const getCity = async function (req, res) {
  const { city } = req.query;
  const searchQuery = {};

  if (city) {
    searchQuery.city = { $regex: new RegExp(city, "i") };
  }

  const hotels = await hotelModel.find(searchQuery).sort({ createdAt: -1 });

  res.json(hotels);
};

//=================================================================================

const getHotelsById = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;

    // Assuming you have the necessary models imported
    const hotel = await hotelModel.findOne({ hotelId });

    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//=============================================
const getHotelsByPrice = async function (req, res) {
  const minPrice = req.query.minPrice ? parseInt(req.query.minPrice) : 0;
  const maxPrice = req.query.maxPrice
    ? parseInt(req.query.maxPrice)
    : Number.MAX_SAFE_INTEGER;

  try {
    const hotels = await hotelModel
      .find({
        roomDetails: {
          $elemMatch: {
            price: { $gte: minPrice, $lte: maxPrice },
          },
        },
      })
      .exec();

    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

//==================================================================================
const deleteHotelById = async function (req, res) {
  const { hotelId } = req.params;
  const deletedData = await hotelModel.findOneAndDelete({ hotelId: hotelId });
  res.status(200).json({ message: "deleted" });
};
//===========================================================
const getHotelsByLocalID = async (req, res) => {
  const { localId } = req.params;

  try {
    const hotels = await hotelModel
      .find({ "location.localId": localId })
      .sort({ createdAt: -1 });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
};

//============================================hotels by filter city,state,landmark=================================================
const getHotelsByFilters = async (req, res) => {
  try {
    const {
      city,
      state,
      landmark,
      starRating,
      propertyType,
      localId,
      countRooms,
      type,
      bedTypes,
      amenities,
      unmarriedCouplesAllowed,
      minPrice,
      maxPrice, // Add minPrice and maxPrice to the destructuring assignment
    } = req.query;

    let filters = {};

    if (city) filters.city = { $regex: new RegExp(city, "i") };
    if (state) filters.state = { $regex: new RegExp(state, "i") };
    if (landmark) filters.landmark = { $regex: new RegExp(landmark, "i") };
    if (starRating) filters.starRating = starRating;
    if (propertyType)
      filters.propertyType = { $regex: new RegExp(propertyType, "i") };

    if (localId) filters.localId = localId;
    if (countRooms) filters["rooms.countRooms"] = countRooms;
    if (type) filters["rooms.type"] = { $regex: new RegExp(type, "i") };
    if (bedTypes)
      filters["rooms.bedTypes"] = { $regex: new RegExp(bedTypes, "i") };
    if (amenities)
      filters["amenities.amenities"] = { $in: amenities.split(",") };
    if (unmarriedCouplesAllowed)
      filters["policies.unmarriedCouplesAllowed"] = unmarriedCouplesAllowed;

    // Add the minPrice and maxPrice filtering
    if (minPrice || maxPrice) {
      filters["rooms.price"] = {};
      if (minPrice) filters["rooms.price"].$gte = parseInt(minPrice);
      if (maxPrice) filters["rooms.price"].$lte = parseInt(maxPrice);
    }

    const hotels = await hotelModel.find(filters);
    const acceptedHotels = hotels.filter((hotel) => hotel.isAccepted);
    res.status(200).json({ success: true, data: acceptedHotels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

//===================================update room =============================================
const updateRoom = async (req, res) => {
  const { hotelid, roomid } = req.params;
  const { type, bedTypes, price } = req.body;

  // Assuming images are optional in the request body
  const images = req.files ? req.files.map((file) => file.location) : [];

  try {
    // Use lean() to get a plain JavaScript object instead of a mongoose document
    const hotel = await hotelModel.findById(hotelid).lean();

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    const roomIndex = hotel.roomDetails.findIndex(
      (room) => room._id.toString() === roomid
    );
    if (roomIndex === -1) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Update only if the field is provided in the request body
    if (type !== undefined) {
      hotel.roomDetails[roomIndex].type = type;
    }
    if (bedTypes !== undefined) {
      hotel.roomDetails[roomIndex].bedTypes = bedTypes;
    }
    if (price !== undefined) {
      hotel.roomDetails[roomIndex].price = price;
    }
    // Update images only if images are provided in the request
    if (images.length > 0) {
      hotel.roomDetails[roomIndex].images = images;
    }

    // Use updateOne instead of save to update specific fields
    await hotelModel.updateOne(
      { _id: hotelid, "roomDetails._id": roomid },
      { $set: { "roomDetails.$": hotel.roomDetails[roomIndex] } }
    );

    // Return the updated room details
    res.json(hotel.roomDetails[roomIndex]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//==================================add new room===============================================
const addRoomToHotel = async function (req, res) {
  const { hotelId } = req.params;
  const { type, bedTypes, price, countRooms } = req.body;

  try {
    const hotel = await hotelModel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    const images = req.files.map((file) => file.location);
    const newDetails = {
      images,
      type,
      bedTypes,
      price,
      countRooms, // Corrected property name
    };

    hotel.roomDetails.push(newDetails);
    hotel.numRooms += countRooms;
    await hotel.save();

    return res.status(200).json(hotel);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//====================================add foods to hotel============================================
const addFoodToHotel = async (request, response) => {
  const { hotelId } = request.params;
  const { name, foodType, about, price } = request.body;
  const hotel = await hotelModel.findById(hotelId);

  const images = request.files.map((file) => file.location);
  const foods = {
    name,
    foodType,
    images,
    about,
    price,
  };

  hotel.foodItems.push(foods);
  await hotel.save();
  response.json(hotel);
};

//=====================================delete foods==========================================
const deleteFoods = async function (req, res) {
  const { hotelId } = req.params;
  const { foodId } = req.body;

  try {
    const hotel = await hotelModel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    const foodIndex = hotel.foodItems.findIndex(
      (food) => food._id.toString() === foodId
    );

    if (foodIndex === -1) {
      return res
        .status(404)
        .json({ error: "Room detail not found in the hotel" });
    }

    hotel.foodItems.splice(foodIndex, 1);

    await hotel.save();

    return res.status(200).json(hotel);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//=============================delete room======================================================
const deleteRoom = async function (req, res) {
  const { hotelId } = req.params;
  const { roomId } = req.body;

  try {
    const hotel = await hotelModel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    const room = hotel.roomDetails.find(
      (room) => room._id.toString() === roomId
    );

    if (!room) {
      return res
        .status(404)
        .json({ error: "Room detail not found in the hotel" });
    }

    // Decrease the numRooms count by the value of room.countRooms
    hotel.numRooms -= room.countRooms;

    // Remove the room from the roomDetails array
    hotel.roomDetails = hotel.roomDetails.filter(
      (room) => room._id.toString() !== roomId
    );

    // Save the updated hotel document
    await hotel.save();

    return res.status(200).json(hotel);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//update hotel amenity
const updateAmenity = async (req, res) => {
  const { id } = req.params;
  const { amenities } = req.body;
  const hotel = await hotelModel.findById(id);

  if (!hotel) {
    return res.status(404).json({ message: "Hotel not found" });
  }

  hotel.amenities = amenities;
  await hotel.save();

  return res.json({ message: "Amenities updated successfully", hotel });
};

const getHotelsState = async function (req, res) {
  try {
    const getState = await hotelModel.find();

    // Use Set to keep track of unique state names
    const uniqueStatesSet = new Set();

    const finalData = getState.reduce((acc, stateData) => {
      const stateName = stateData.state;

      // Check if the state name is not already in the Set
      if (!uniqueStatesSet.has(stateName)) {
        // Add state name to the Set
        uniqueStatesSet.add(stateName);

        // Add the state data to the result array
        acc.push(stateName);
      }

      return acc;
    }, []);

    res.json(finalData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getHotelsCity = async function (req, res) {
  try {
    const { state } = req.query;

    if (!state) {
      return res.status(400).json({ error: "State parameter is missing" });
    }

    const hotelsInState = await hotelModel.find({ state });

    // Use Set to keep track of unique city names
    const uniqueCitiesSet = new Set();

    // Extracting only the 'city' field from each document and filtering out duplicates
    const cityData = hotelsInState.reduce((acc, hotel) => {
      const cityName = hotel.city;

      // Check if the city name is not already in the Set
      if (!uniqueCitiesSet.has(cityName)) {
        // Add city name to the Set
        uniqueCitiesSet.add(cityName);

        // Add the city name to the result array
        acc.push(cityName);
      }

      return acc;
    }, []);

    res.json(cityData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//==============================Apply Coupon=========================================

const checkAndUpdateOffers = async () => {
  try {
    // Find documents where offer has expired
    const expiredOffers = await hotelModel.find({
      offerExp: { $lt: new Date() },
    });

    // Update room prices and details using object-based updates
    for (const hotel of expiredOffers) {
      for (let i = 0; i < hotel.rooms.length; i++) {
        const roomUpdates = {
          price: hotel.rooms[i].originalPrice,
          offerDetails: "N/A",
        };

        // Update the specific room using $set operator (optional)
        hotel.rooms.$set = hotel.rooms.$set || {}; // Initialize if not set
        hotel.rooms.$set[i] = roomUpdates;

        // **OR** Update the room directly at the index (simpler)
        hotel.rooms[i] = { ...hotel.rooms[i], ...roomUpdates };
      }

      // Set isOffer to false for the hotel
      hotel.isOffer = false;

      await hotel.save();
    }

    console.log("Expired offers processed successfully.");
  } catch (error) {
    console.error("Error processing expired offers:", error);
  }
};


// Schedule the function to run every day at midnight (adjust as needed)
cron.schedule("0 0 * * *", async () => {
  await checkAndUpdateOffers();
});

//==================================================================================

const ApplyCoupon = async (req, res) => {
  const { hotelId, roomId } = req.params;
  const { offerDetails, offerExp, offerPriceLess, isOffer } = req.body;
  const offerStartDate = new Date().toISOString().split("T")[0];
  try {
    const hotel = await hotelModel.findByIdAndUpdate(hotelId);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    // Find the room directly from the hotel data
    const roomIndex = hotel.rooms.findIndex(
      (room) => room._id.toString() === roomId
    );
    if (roomIndex === -1) {
      return res.status(404).json({ error: "Room not found in the hotel" });
    }
    const originalPrice = hotel.rooms[roomIndex].price;
    // Create a new room object with updated details
    const updatedRoom = {
      ...hotel.rooms[roomIndex], // Spread operator to copy existing properties
      offerDetails,
      offerExp,
      offerPriceLess,
      offerStartDate,
    };
    // Check if the offer has expired
    const hasOfferExpired = new Date() >= new Date(offerExp);
    // Apply the offer if it's not expired
    if (!hasOfferExpired) {
      const discountPercentage = offerPriceLess / 100;
      updatedRoom.price = originalPrice - originalPrice * discountPercentage;
      updatedRoom.originalPrice = originalPrice;
    } else {
      // If offer has expired, revert to original price
      delete updatedRoom.originalPrice;
    }
    // Update the room in the hotel object
    hotel.rooms[roomIndex] = updatedRoom;
    await hotel.save();
    res.json(hotel);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//================================remove offer=====================
const expireOffer = async function (req, res) {
  try {
    const { id, roomid } = req.params;
    const { offerExp, isOffer, offerPriceLess, offerDetails } = req.body;
    const defaultOfferExp = new Date().toISOString().split("T")[0];

    // Retrieve the hotel object
    const hotel = await hotelModel.findById(id);

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    // Find the room's index in the rooms array
    const roomIndex = hotel.rooms.findIndex(
      (room) => room._id.toString() === roomid
    );

    if (roomIndex === -1) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Create an update object
    const roomUpdates = {
      offerExp: offerExp || defaultOfferExp,
      isOffer: isOffer !== undefined ? isOffer : false,
      offerPriceLess: offerPriceLess !== undefined ? offerPriceLess : 0,
      offerDetails: offerDetails || "N/A",
      price: hotel.rooms[roomIndex].originalPrice, // Ensure price is reset to originalPrice
    };

    // Update the specific room using $set operator (optional)
    hotel.rooms.$set = hotel.rooms.$set || {}; // Initialize if not set
    hotel.rooms.$set[roomIndex] = roomUpdates;

    // **OR** Update the room directly at the index (simpler)
    hotel.rooms[roomIndex] = { ...hotel.rooms[roomIndex], ...roomUpdates };

    // Save the updated hotel object with error handling
    const savedHotel = await hotel.save();

    if (!savedHotel) {
      return res.status(500).json({ error: "Error saving hotel data" });
    }

    res.status(200).json(savedHotel);
  } catch (error) {
    console.error("Error updating hotel:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



//=============================================================
const getByRoom = async (req, res) => {
  const roomType = req.params.roomType;

  try {
    const hotel = await hotelModel
      .findOne({ "roomDetails.type": roomType })
      .select("_id roomDetails hotelName"); // Include hotelName in the select projection

    if (!hotel) {
      return res
        .status(404)
        .json({ message: "No hotel found for the specified room type." });
    }

    // Extract only the roomDetails for the specified type
    const standardRoom = hotel.roomDetails.find(
      (room) => room.type === roomType
    );

    if (!standardRoom) {
      return res
        .status(404)
        .json({ message: "No data found for the specified room type." });
    }

    // Include hotelName in the response
    res.json({
      hotels: {
        _id: hotel._id,
        hotelName: hotel.hotelName,
        roomDetails: [standardRoom],
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//=================================Update price monthly============================================
const monthlyPrice = async function (req, res) {
  try {
    const rooms = await month.find();
    const currentDate = new Date();
    const hotels = await hotelModel.find();

    for (const room of rooms) {
      for (const hotel of hotels) {
        for (const roomDetails of hotel.roomDetails) {
          if (String(room.roomId) === String(roomDetails._id)) {
            const roomDate = room.monthDate;

            if (roomDate <= currentDate) {
              roomDetails.price += room.monthPrice;
              await hotel.save();
            } else {
              return res.status(400).json({ error: "Date not matched." });
            }
          }
        }
      }
    }

    res.status(200).json({ message: "Monthly prices updated successfully." });
  } catch (error) {
    console.error("Error in monthlyPrice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

cron.schedule("0 0 1 * *", async () => {
  await monthlyPrice();
});
// The first 0 represents the minute (00).
// The second 0 represents the hour (00).
// The 1 in the third position represents the day of the month (1st).
// The * in the fourth and fifth positions represents any month and any day of the week.

//================================================================================================
module.exports = {
  createHotel,
  getAllHotels,
  getAllRejectedHotels,
  getHotelsById,
  getHotelsByPrice,
  getHotelsByLocalID,
  getHotelsByFilters,
  checkAndUpdateOffers,
  getCity,
  getByQuery,
  UpdateHotel,
  getHotels,
  getOffers,
  updateRoom,
  increaseRoomToHotel,
  decreaseRoomToHotel,
  addRoomToHotel,
  deleteRoom,
  addFoodToHotel,
  deleteFoods,
  updateAmenity,
  deleteHotelById,
  UpdateHotelInfo,
  getHotelsState,
  getHotelsCity,
  ApplyCoupon,
  expireOffer,
  getByRoom,
  monthlyPrice,
  getCount,
  getCountPendingHotels,
};
