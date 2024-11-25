const Travel = require('../../models/travel/travelModel');

exports.createTravel = async (req, res) => {
    try {
        const { termsAndConditions, ...body } = req.body;

        const images = req.files ? req.files.map((file) => file.location) : [];

        if (termsAndConditions && typeof termsAndConditions === 'object') {
            req.body.termsAndConditions = new Map(Object.entries(termsAndConditions));
        }
        const created = await Travel.create({
            ...body,
            images,
            termsAndConditions: req.body.termsAndConditions,
        });

        res.status(201).json({ success: true, data: created });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to create travel' });
    }
};

exports.sortByOrder = async function (req, res) {
    try {
        const { sort } = req.query;
        let sortOrder = 1;
        if (sort === 'desc') {
            sortOrder = -1;
        } else if (sort !== 'asc') {
            return res.status(400).json({ message: 'Invalid sort parameter. Use "asc" or "desc".' });
        }
        const travels = await Travel.find().sort({ price: sortOrder });
        res.json(travels);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching travels', error });
    }
};

exports.sortByPrice = async (req, res) => {
    const { minPrice, maxPrice } = req.query;

    try {
        const query = {};

        if (minPrice) query.price = { $gte: minPrice };
        if (maxPrice) query.price = { ...query.price, $lte: maxPrice };

        const findData = await Travel.find(query);

        return res.json(findData);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.sortByDuration = async (req, res) => {
    const { minNights, maxNights } = req.query;

    try {
        let query = {};
        if (minNights) {
            query.nights = { ...query.nights, $gte: parseInt(minNights) };
        }
        if (maxNights) {
            query.nights = { ...query.nights, $lte: parseInt(maxNights) };
        }
        const findData = await Travel.find(query);
        return res.json(findData);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.sortBythemes = async (req, res) => {
    try {
        const { themes } = req.query;
        const findData = await Travel.find({ themes: themes });
        return res.json(findData);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getTravelList = async function (_, res) {
    try {
        const findData = await Travel.find();
        return res.status(200).json(findData);
    } catch (error) {
        console.error(error);
    }
};

exports.getTravelById = async (req, res) => {
    try {
        const { id } = req.params;
        const findData = await Travel.findById(id);
        return res.status(200).json(findData);
    } catch (error) {
        console.error(error);
    }
};

exports.getByCity = async function (req, res) {
    const { city } = req.query;
    try {
        const query = city ? { city: { $regex: city, $options: 'i' } } : {};
        const results = await Travel.find(query);
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to retrieve data' });
    }
};

exports.getAllCities = async (req, res) => {
    try {
        const findAll = await Travel.find();
        if (findAll && findAll.length > 0) {
            const cities = [...new Set(findAll.map((travel) => travel.city))];
            res.status(200).json(cities);
        }
    } catch (error) {
        return res.status(500).json("It seems's an error !");
    }
};
