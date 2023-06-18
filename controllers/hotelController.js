const hotelModel = require('../models/hotelModel');

const createHotel = async (req, res) => {
  try {
    const {
      hotelName,
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
      moreOptions,
      amenities,
      reviews,
    } = req.body;

    const hotelData = {
      hotelName,
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
      searchQuery.destination = destination;
    }

    if (startDate && endDate) {
      searchQuery.startDate = { $gte: new Date(startDate) };
      searchQuery.endDate = { $lte: new Date(endDate) };
    }

    if (guests) {
      searchQuery.guests = guests;
    }

    if (numRooms) {
      searchQuery.numRooms = numRooms;
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
    

    const searchResults = await hotelModel.find(searchQuery);
    if (searchResults.length === 0) {
        return res.status(404).send({ status: false, message: "no data found" })
    }
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

 module.exports = {
   createHotel,
   searchHotels,
   getAllHotels,
 };
