const hotelModel = require('../models/hotelModel');

const createHotel = async (req, res) => {
  try {
    const {
      hotelName,
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
      moreOptions,
      amenities,
      reviews,
      rating
    } = req.body;
    const images = req.files.map((file) => file.location);

    const hotelData = {
      images,
      hotelName,
      description,
      destination,
      price,
      rating,
      startDate,
      endDate,
      guests,
      numRooms,
      localId,
      maritalStatus,
      availability,
      hotelsPolicy,
      moreOptions, 
      amenities,
      reviews,
    };

    const newHotel = await hotelModel.create(hotelData);
    return res.status(201).json({ hotelData: newHotel });
  } catch (error) {
    console.error('Error creating hotel:', error);
    return res.status(500).json({ error: 'Failed to create hotel' });
  }
};


//================================================================================================
const searchHotels = async (req, res) => {
  try {
    const { destination, startDate, endDate, guests, numRooms, localId, moreOptions } = req.query;

    const searchQuery = {};

    if (destination) {
        searchQuery.destination = destination;
    }

    if (startDate && endDate) {
        // Checking if the start date is before the end date
        if (startDate <= endDate) {

            // Getting the hotels that are available between the start and end date
            searchQuery.startDate = { $lte: new Date(startDate) };
            searchQuery.endDate = { $gte: new Date(endDate) };
        }
    }

    if (numRooms) {
        searchQuery.numRooms = { $gte: Number(numRooms) };
    }

    // Set localId to false by default if not passed
    if (localId !== undefined && localId !== '') {
        searchQuery.localId = localId;
    } else {
        searchQuery.localId = false;
    }

    if (moreOptions) {
        const options = moreOptions.split(',');
        searchQuery.moreOptions = { $in: options };
    }

    let searchResults = await hotelModel.find(searchQuery).lean();
    searchResults = searchResults.map((hotel) => {
        // Calculate extra guests by multiplying the number of guests allowed times the number of rooms
        const extraGuests = guests - (hotel.guests * Number(numRooms)) > 0 ? guests - (hotel.guests * Number(numRooms)) : 0;

        // Calculate the total price by multiplying the price per room times the number of rooms plus the extra guests times 10% of the price per room
        hotel.price = (Number(hotel.price) * Number(numRooms)) + (extraGuests * (Number(hotel.price) * 0.1));

        return hotel;
    });
    res.json(searchResults);
} catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Failed to fetch search results' });
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

//==========================================================================

const getHotelbyName = async (req, res) => {
  try {
    const {destination} = req.query
    const hotels = await hotelModel.find({ destination:destination});
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


 //=================================================================================

 const getHotelsById = async (req,res)=>{
  try {
    const data = req.params.id
    const hotels = await hotelModel.findById((data));
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 }

//=============================================
const getHotelsByPrice = async function (req,res) {
  const minPrice = req.query.minPrice || 0;
  const maxPrice = req.query.maxPrice || Number.MAX_SAFE_INTEGER;

  try {
    const hotels = await hotelModel.find({
      price: { $gt: minPrice, $lt: maxPrice },
    });

    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}




 module.exports = {
   createHotel,
   searchHotels,
   getAllHotels,
   getHotelbyName,
   getHotelsById,
   getHotelsByPrice

 };