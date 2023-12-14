const hotelModel = require("../models/hotelModel");
const cron = require('node-cron');
const createHotel = async (req, res) => {
  try {
    const {
      hotelName,
      hotelOwnerName,
      roomDetails,
      foodItems,
      description,
      destination,
      price,
      startDate,
      endDate,
      guests,
      numRooms,
      localId,
      maritalStatus,
      hotelsPolicy,
      checkInPolicy,
      checkOutPolicy,
      customerWelcomeNote,
      amenities,
      reviews,
      rating,
      categories,
      collections,
      accommodationType,
      starRating,
      propertyType,
      isOffer,
      offerDetails,
      offerPriceLess,
      contact,
      ownerContactDetails,
      hotelEmail,
      generalManagerContact,
      salesManagerContact,
      street,
      city,
      state,
      zip,
      landmark,
      outsideFoodPolicy,
      cancellationPolicy,
      paymentMode,
      petsAllowed,
      bachelorAllowed,
      smokingAllowed,
      alcoholAllowed,
      unmarriedCouplesAllowed,
      internationalGuestAllowed,
      returnPolicy,
      onDoubleSharing,
      onQuadSharing,
      onBulkBooking,
      onTrippleSharing,
      onMoreThanFour,
      offDoubleSharing,
      offQuadSharing,
      offBulkBooking,
      offTrippleSharing,
      offMoreThanFour,
      onDoubleSharingAp,
      onQuadSharingAp,
      onBulkBookingAp,
      onTrippleSharingAp,
      onMoreThanFourAp,
      offDoubleSharingAp,
      offQuadSharingAp,
      offBulkBookingAp,
      offTrippleSharingAp,
      offMoreThanFourAp,
      onDoubleSharingMAp,
      onQuadSharingMAp,
      onBulkBookingMAp,
      onTrippleSharingMAp,
      onMoreThanFourMAp,
      offDoubleSharingMAp,
      offQuadSharingMAp,
      offBulkBookingMAp,
      offTrippleSharingMAp,
      offMoreThanFourMAp,
    } = req.body;

    const images = req.files.map((file) => file.location);

    const hotelData = {
      images,
      hotelName,
      hotelOwnerName,
      roomDetails,
      foodItems,
      description,
      destination,
      price,
      startDate,
      endDate,
      guests,
      numRooms,
      isOffer,
      offerDetails,
      offerPriceLess,
      localId,
      maritalStatus,
      hotelsPolicy,
      checkInPolicy,
      checkOutPolicy,
      customerWelcomeNote,
      amenities,
      reviews,
      rating,
      starRating,
      propertyType,
      contact,
      ownerContactDetails,
      hotelEmail,
      generalManagerContact,
      salesManagerContact,
      street,
      city,
      state,
      zip,
      landmark,
      categories,
      collections,
      accommodationType,
      outsideFoodPolicy,
      cancellationPolicy,
      paymentMode,
      petsAllowed,
      bachelorAllowed,
      smokingAllowed,
      alcoholAllowed,
      unmarriedCouplesAllowed,
      internationalGuestAllowed,
      returnPolicy,
      onDoubleSharing,
      onQuadSharing,
      onBulkBooking,
      onTrippleSharing,
      onMoreThanFour,
      offDoubleSharing,
      offQuadSharing,
      offBulkBooking,
      offTrippleSharing,
      offMoreThanFour,
      onDoubleSharingAp,
      onQuadSharingAp,
      onBulkBookingAp,
      onTrippleSharingAp,
      onMoreThanFourAp,
      offDoubleSharingAp,
      offQuadSharingAp,
      offBulkBookingAp,
      offTrippleSharingAp,
      offMoreThanFourAp,
      onDoubleSharingMAp,
      onQuadSharingMAp,
      onBulkBookingMAp,
      onTrippleSharingMAp,
      onMoreThanFourMAp,
      offDoubleSharingMAp,
      offQuadSharingMAp,
      offBulkBookingMAp,
      offTrippleSharingMAp,
      offMoreThanFourMAp,
    };

    const savedHotel = await hotelModel.create(hotelData);

    return res.status(201).json({
      status: true,
      data: savedHotel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//==================================UpdateHotel================================
const UpdateHotel = async function (req, res) {
  const { id } = req.params;
  const {isAccepted,isOffer,offerDetails,offerPriceLess,offerExp} = req.body;

  let images = [];

  if (req.files && req.files.length > 0) {
    images = req.files.map((file) => file.location);
  } else {
    const user = await hotelModel.findById(id);
    if (user) {
      images = user.images;
    }
  }
  const updatedHotel = await hotelModel.findByIdAndUpdate(id,{images,isOffer,isAccepted,offerDetails,offerPriceLess,offerExp},{new: true});

  if (!updatedHotel) {
    return res.status(404).json({ error: "Hotel not found" });
  }

  return res.status(200).json({
    status: true,
    data: updatedHotel,
  });
};
//================================update hotel info =================================================
const UpdateHotelInfo = async(req,res)=>{
  const { id } = req.params;
  const {
    hotelName,
    hotelOwnerName,
    description,
    destination,
    numRooms,
    localId,
    accommodationType,
    starRating,
    propertyType,
    contact,
    ownerContactDetails,
    generalManagerContact,
    salesManagerContact,
    receptionContactDetails,
    hotelEmail,
    street,
    city,
    state,
    zip,
    landmark
  } = req.body;

  let images = [];

  if (req.files && req.files.length > 0) {
    images = req.files.map((file) => file.location);
  } else {
    const user = await hotelModel.findById(id);
    if (user) {
      images = user.images;
    }
  }
  const updatedHotel = await hotelModel.findByIdAndUpdate(
    id,
    {
      images,
      hotelName,
      hotelOwnerName,
      description,
      destination,
      numRooms,
      localId,
      accommodationType,
      starRating,
      propertyType,
      contact,
      ownerContactDetails,
      generalManagerContact,
      salesManagerContact,
      receptionContactDetails,
      hotelEmail,
      street,
      city,
      state,
      zip,
      landmark
    },
    {
      new: true,
    }
  );

  if (!updatedHotel) {
    return res.status(404).json({ error: "Hotel not found" });
  }

  return res.status(200).json({
    status: true,
    data: updatedHotel,
  });
}


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
    roomType, // Change this to roomType
  } = req.query;

  let query = {};

  if (amenities) {
    query.amenities = { $in: amenities };
  }

  if (bedTypes) {
    query.roomDetails = { $elemMatch: { bedTypes: { $in: bedTypes } } };
  }

  if (starRating) {
    query.starRating = { $in: starRating };
  }

  if (propertyType) {
    query.propertyType = { $in: propertyType };
  }

  if (hotelOwnerName) {
    query.hotelOwnerName = { $regex: new RegExp(hotelOwnerName, "i") };
  }
  if (hotelEmail) {
    query.hotelEmail = { $regex: new RegExp(hotelEmail, "i") };
  }

  if (roomType) {
    query.roomDetails = { $elemMatch: { type: { $in: roomType } } };
  }

  const fetchedData = await hotelModel.find(query);
  res.json(fetchedData);
};

//================================================================================================
const searchHotels = async (req, res) => {
  try {
    const { city, startDate, endDate, guests, numRooms, localId } = req.query;

    const searchQuery = {};

    if (city) {
      searchQuery.city = { $regex: new RegExp(city, "i") };
    }

    if (startDate && endDate) {
      if (startDate <= endDate) {
        searchQuery.startDate = { $lte: new Date(startDate) };
        searchQuery.endDate = { $gte: new Date(endDate) };
      }
    }

    if (numRooms) {
      searchQuery.numRooms = { $gte: Number(numRooms) };
    }

    if (localId !== undefined && localId !== "") {
      searchQuery.localId = localId;
    } else {
      searchQuery.localId = false;
    }

    let searchResults = await hotelModel.find(searchQuery).lean();
    searchResults = searchResults.map((hotel) => {
      const extraGuests =
        guests - hotel.guests * Number(numRooms) > 0
          ? guests - hotel.guests * Number(numRooms)
          : 0;

      hotel.price =
        Number(hotel.price) * Number(numRooms) +
        extraGuests * (Number(hotel.price) * 0.1);

      return hotel;
    });
    res.json(searchResults);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
};

//====================================================================================
const getAllHotels = async (req, res) => {
  try {
    const hotels = await hotelModel.find().sort({ createdAt: -1 });
    const hotelsData = hotels.filter(
      (accepted) => accepted.isAccepted === true
    );
    res.json(hotelsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
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
    const data = req.params.id;
    const hotels = await hotelModel.findById(data).sort({ createdAt: -1 });
    res.json(hotels);
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
  const { id } = req.params;
  const deletedData = await hotelModel.findByIdAndDelete(id);
  res.json(deletedData);
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

//=============================================================================================
const getHotelsByFilters = async (req, res) => {
  try {
    const { collections, categories, accommodationTypes, checkInFeatures } =
      req.query;

    const filters = {};

    if (collections) {
      filters.collections = { $in: collections.split(",") };
    }

    if (categories) {
      filters.categories = { $in: categories.split(",") };
    }

    if (accommodationTypes) {
      filters.accommodationType = { $in: accommodationTypes.split(",") };
    }

    if (checkInFeatures) {
      filters.checkInFeatures = { $in: checkInFeatures.split(",") };
    }

    const Hotels = await hotelModel.find(filters);

    res.status(200).json({
      status: true,
      data: Hotels,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the hotels." });
  }
};
//===================================update room =============================================
const updateRoom = async (req, res) => {
  const { hotelid, roomid } = req.params;
  const { type, bedTypes, price } = req.body;
  
  // Assuming images are optional in the request body
  const images = req.files ? req.files.map(file => file.location) : [];

  try {
    // Use lean() to get a plain JavaScript object instead of a mongoose document
    const hotel = await hotelModel.findById(hotelid).lean();

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    const roomIndex = hotel.roomDetails.findIndex((room) => room._id.toString() === roomid);
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
    await hotelModel.updateOne({ _id: hotelid, 'roomDetails._id': roomid }, { $set: { 'roomDetails.$': hotel.roomDetails[roomIndex] } });

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
      return res.status(400).json({ error: 'State parameter is missing' });
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//==============================Apply Coupon=========================================
const checkAndUpdateOffers = async () => {
  try {
    // Find documents where offer has expired
    const expiredOffers = await hotelModel.find({ offerExp: { $lt: new Date() } });

    // Update room prices to their original values
    for (const hotel of expiredOffers) {
      for (const room of hotel.roomDetails) {
        room.price = room.originalPrice;
      }
      await hotel.save();
    }

    console.log('Expired offers processed successfully.');
  } catch (error) {
    console.error('Error processing expired offers:', error);
  }
};

// Schedule the function to run every day at midnight (adjust as needed)
cron.schedule('0 0 * * *', async () => {
  await checkAndUpdateOffers();
});
//==================================================================================
const ApplyCoupon = async (req, res) => {
  const { hotelid, roomid } = req.params;
  const { offerDetails, offerExp, offerPriceLess, isOffer } = req.body;

  // Set offerStartDate to the current date
  const offerStartDate = new Date().toISOString().split('T')[0];

  try {
    // Find the hotel by ID
    const hotel = await hotelModel.findById(hotelid);

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    // Find the room by ID within the hotel
    const room = hotel.roomDetails.find((room) => room._id.toString() === roomid);

    if (!room) {
      return res.status(404).json({ error: "Room not found in the hotel" });
    }

    // Store the original room price
    const originalPrice = room.price;

    // Update the offer details including offerStartDate
    const updatedHotel = await hotelModel.findByIdAndUpdate(
      hotelid,
      { offerDetails, offerExp, offerPriceLess, isOffer, offerStartDate },
      { new: true }
    );

    // Check if the offer has expired
    const hasOfferExpired = new Date() >= new Date(offerExp);

    // Apply offerPriceLess percentage reduction to the specified room's price
    if (isOffer) {
      const discountPercentage = offerPriceLess / 100;

      // Update the price for the specified room
      const updatedRoom = updatedHotel.roomDetails.find((room) => room._id.toString() === roomid);

      if (updatedRoom) {
        if (hasOfferExpired) {
          // Offer has expired, revert the room price to its original value
          updatedRoom.price = originalPrice;
        } else {
          // Offer is still valid, apply the discount
          updatedRoom.price -= updatedRoom.price * discountPercentage;
        }
      }

      // Save the updated hotel document
      await updatedHotel.save();
    }

    res.json(updatedHotel);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



//================================================================================================
module.exports = {
  createHotel,
  searchHotels,
  getAllHotels,
  getAllRejectedHotels,
  getHotelsById,
  getHotelsByPrice,
  getHotelsByLocalID,
  getHotelsByFilters,
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
  ApplyCoupon
};
