const hotelModel = require("../models/hotelModel");
const roomModel = require("../models/roomModel")
const createHotel = async (req, res) => {
  try {
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
    } = req.body;

 const images = req.files.map((file)=> file.location)

    const hotelData = {
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

module.exports = createHotel;



//==================================UpdateHotel================================
const UpdateHotel = async function(req, res) {
  const { id } = req.params;
  const {updateData} = req.body; 

  try {
    const updatedHotel = await hotelModel.findByIdAndUpdate(id, updateData, {
      new: true, 
      runValidators: true, 
    });

    if (!updatedHotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    return res.status(200).json({
      status: true,
      data: updatedHotel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//=============================get hotel by amenities===========================//
const getByQuery = async (req, res) => {
  const { amenities, bedTypes,roomTypes,starRating,propertyType,hotelOwnerName } = req.query;
  let query = {};

  if (amenities) {
    query.amenities = {$in : amenities};
  }

  if (bedTypes) {
    query.bedTypes = {$in : bedTypes};
  }

  if (roomTypes) {
    query.roomTypes = {$in : roomTypes};
  }
if(starRating){
  query.starRating={$in : starRating};
}
if(propertyType){
  query.propertyType={$in : propertyType};
}
if(hotelOwnerName){
  query.hotelOwnerName= hotelOwnerName
}
  const fetchedData = await hotelModel.find(query);
  res.json(fetchedData);
};

//================================================================================================
const searchHotels = async (req, res) => {
  try {
    const {
      destination,
      startDate,
      endDate,
      guests,
      numRooms,
      localId,
      moreOptions,
    } = req.query;

 
    
    const searchQuery = {};

    if (destination) {
      searchQuery.destination ={$regex: new RegExp(destination, 'i')};
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

    if (moreOptions) {
      const options = moreOptions.split(",");
      searchQuery.moreOptions = { $in: options };
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
    const hotels = await hotelModel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//============================get by city============================================//
const getCity = async function(req,res){
 const {destination} = req.body
  const hotels= await hotelModel.findOne({destination:destination})
 
  res.json(hotels)
}


//=================================================================================

const getHotelsById = async (req, res) => {
  try {
    const data = req.params.id;
    const hotels = await hotelModel.findById(data);
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//=============================================
const getHotelsByPrice = async function (req, res) {
  const minPrice = req.query.minPrice ? parseInt(req.query.minPrice) : 0;
  const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice) : Number.MAX_SAFE_INTEGER;

  try {
    const hotels = await hotelModel.find({
      price: { $gte: minPrice, $lte: maxPrice },
    }).exec();

    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
}
//==================================================================================

const getHotelsByLocalID = async (req, res) => {
  const { localId } = req.params;

  try {
    const hotels = await hotelModel.find({ 'location.localId': localId });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
};

//=============================================================================================
const getHotelsByFilters = async (req, res) => {
  try {
    const { collections, categories, accommodationTypes, hotelFacilities, checkInFeatures } = req.query;

    const filters = {};

    if (collections) {
      filters.collections = { $in: collections.split(',') };
    }

    if (categories) {
      filters.categories = { $in: categories.split(',') };
    }

    if (accommodationTypes) {
      filters.accommodationType = { $in: accommodationTypes.split(',') };
    }

    if (checkInFeatures) {
      filters.checkInFeatures = { $in: checkInFeatures.split(',') };
    }

    const Hotels = await hotelModel.find(filters);

    res.status(200).json({
      status: true,
      data: Hotels,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the hotels.' });
  }
};

module.exports = {
  createHotel,
  searchHotels,
  getAllHotels,
  getHotelbyName,
  getHotelsById,
  getHotelsByPrice,
  getHotelsByAccommodation,
  getHotelsByLocalID,
  getHotelsByCategory,
  getHotelsByFilters,
  getCity,
  getByQuery,
  UpdateHotel,
};
