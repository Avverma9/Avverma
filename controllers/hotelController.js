const hotelModel = require("../models/hotelModel");

// const createHotel = async function (req, res) {
//   try {
//     const {
//       hotelName,
//       hotelOwnerName,
//       description,
//       destination,
//       price,
//       startDate,
//       endDate,
//       guests,
//       numRooms,
//       roomTypes, 
//       localId,
//       maritalStatus,
//       availability,
//       hotelsPolicy,
//       // moreOptions,
//       amenities,
//       reviews,
//       rating,
//       // collections,
//       // categories,
//       // accommodationType,
//       checkInFeature,
//       bedTypes,  
//       starRating,  
//       propertyType,  
//       contact,  
//       ownerContactDetails,  
//       hotelEmail,  
//       street,  
//       city,  
//       state,  
//       zip,  
//       landmark,  
//       onDoubleSharing,
//       outsideFoodPolicy,  
//       cancellationPolicy,  
//       paymentMode,  
//       petsAllowed,  
//       bachelorAllowed,  
//       smokingAllowed,  
//       alcoholAllowed,  
//       unmarriedCouplesAllowed,  
//       internationalGuestAllowed,  
//       returnPolicy,  
//     } = req.body;
//     // const images = req.files.map((file) => file.location);

//     const hotelData = {
//       // images,
//       hotelName,
//       hotelOwnerName,
//       roomTypes,
//       description,
//       destination,
//       price,
//       startDate,
//       endDate,
//       guests,
//       numRooms,
//       localId,
//       maritalStatus,
//       availability,
//       hotelsPolicy,
//       // moreOptions,
//       amenities,
//       reviews,
//       rating,
//       // collections,
//       // categories,
//       // accommodationType,
//       checkInFeature,
//       bedTypes,  
//       starRating,  
//       propertyType,  
//       contact,  
//       ownerContactDetails,  
//       hotelEmail,  
//       street,  
//       city,  
//       state,  
//       zip,  
//       landmark,  
//       outsideFoodPolicy,  
//       cancellationPolicy,  
//       paymentMode,  
//       petsAllowed,  
//       bachelorAllowed,  
//       smokingAllowed,  
//       alcoholAllowed,  
//       unmarriedCouplesAllowed,  
//       internationalGuestAllowed,  
//       returnPolicy,  
//       onDoubleSharing ,  
//       onQuadSharing ,  
//       onBulkBooking,  
//       onTrippleSharing,  
//       onMoreThanFour,  
//       onDoubleSharing,  
//       offQuadSharing,  
//       offBulkBooking,  
//       offTrippleSharing,  
//       offMoreThanFour,  
//     };

//     const savedHotel = await hotelModel.create(hotelData);

//     return res.status(201).send({
//       status: true,
//       data: savedHotel,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };




const createHotel = async function (req, res) {
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
      roomTypes,
      localId,
      maritalStatus,
      availability,
      hotelsPolicy,
      amenities,
      reviews,
      rating,
      checkInFeature,
      bedTypes,
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

    const hotelData = {
      hotelName,
      hotelOwnerName,
      roomTypes,
      description,
      destination,
      price,
      startDate,
      endDate,
      guests,
      numRooms,
      localId,
      maritalStatus,
      availability,
      hotelsPolicy,
      amenities,
      reviews,
      rating,
      checkInFeature,
      bedTypes,
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

    return res.status(201).send({
      status: true,
      data: savedHotel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//==================================Update-Numrooms========================================
const updateRooms = async function(req,res){
  const {hotelId}= req.params;
  const { newNumRooms } = req.body;
  try {
    const hotelToUpdate = await hotelModel.findOne(hotelId)
    if(!hotelToUpdate){
      return res.status(404).json({error:"Hotel not found"});
    }
    const currentNumRooms = parseInt(hotelToUpdate.numRooms, 10);
    const addedNumRooms = parseInt(newNumRooms, 10);

    hotelToUpdate.numRooms = (currentNumRooms + addedNumRooms).toString();
    
    const updatedHotel = await hotelToUpdate.save();
    return res.status(200).json({
      status:true,
      data:updatedHotel,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"Internal Server Error"});
  }

}

//==================================UpdateHotel================================
const UpdateHotel = async function(req, res) {
  const { id } = req.params;
  const updateData = req.body; 

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
      searchQuery.moreOptions = { $in: options }
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
//==================================get by category========================================//

//==========================================================================

const getHotelbyName = async (req, res) => {
  try {
    const { destination } = req.query;
    const hotels = await hotelModel.find({ destination: destination });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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


//=====================================================================================================

const getHotelsByAccommodation = async (req, res) => {
  const { type } = req.params;

  try {
    const hotels = await hotelModel.find({ accommodationType: type });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
};


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


//========================================================================================

const getHotelsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const hotels = await hotelModel.find({ categories: category });
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
  updateRooms,
  UpdateHotel,
};
