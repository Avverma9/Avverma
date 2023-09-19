const hotelModel = require("../models/hotelModel");
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
  const {
    hotelName,
    hotelOwnerName,
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
      price,
      startDate,
      endDate,
      guests,
      numRooms,
      localId,
      maritalStatus,
      hotelsPolicy,
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
};
//=======================================add room=====================================
const increaseRoomToHotel = async function (req, res) {
  const { id } = req.params;
  const addRoom = await hotelModel.findById(id);
  addRoom.numRooms += 1;
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
  const { city } = req.body;
  const hotels = await hotelModel
    .findOne({ city: city })
    .sort({ createdAt: -1 });

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
        price: { $gte: minPrice, $lte: maxPrice },
      })
      .exec();

    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
//==================================================================================

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
    const {
      collections,
      categories,
      accommodationTypes,
      checkInFeatures,
    } = req.query;

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

  try {
    const hotel = await hotelModel.findById(hotelid);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    const roomIndex = hotel.roomDetails.findIndex((room) => room._id == roomid);
    if (roomIndex === -1) {
      return res.status(404).json({ error: "Room not found" });
    }

    if (type) {
      hotel.roomDetails[roomIndex].type = type;
    }
    if (bedTypes) {
      hotel.roomDetails[roomIndex].bedTypes = bedTypes;
    }
    if (price) {
      hotel.roomDetails[roomIndex].price = price;
    }

    await hotel.save();
    res.json(hotel.roomDetails[roomIndex]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//==================================add new room===============================================
const addRoomToHotel = async function (req, res) {
  const { hotelId } = req.params;
  const { type, bedTypes, price } = req.body;
    const hotel = await hotelModel.findById(hotelId);
    const images = req.files.map((file)=>file.location)
    const newDetails = {
      type,
      images,
      bedTypes,
      price,
    };
    hotel.roomDetails.push(newDetails);
    await hotel.save();
    return res.status(200).json(hotel);
};
//====================================add foods to hotel============================================
const addFoodToHotel = async (request, response) => {
  const { hotelId } = request.params;
  const { name,about,price } = request.body;
  const hotel = await hotelModel.findById(hotelId)

  const images = request.files.map((file)=>file.location)
  const foods = {
    name,
    images,
    about,
    price,
  };

  hotel.foodItems.push(foods);
  await hotel.save()
  response.json(hotel)
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

    const roomIndex = hotel.roomDetails.findIndex(
      (room) => room._id.toString() === roomId
    );

    if (roomIndex === -1) {
      return res
        .status(404)
        .json({ error: "Room detail not found in the hotel" });
    }

    hotel.roomDetails.splice(roomIndex, 1);

    await hotel.save();

    return res.status(200).json(hotel);
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
  addRoomToHotel,
  deleteRoom,
  addFoodToHotel,
  deleteFoods,
};
