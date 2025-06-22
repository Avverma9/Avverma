exports.createTravel = async (req, res) => {
    try {
        const { termsAndConditions, ...body } = req.body;
        const images = req.files ? req.files.map((file) => file.location) : [];

        if (termsAndConditions && typeof termsAndConditions === 'object') {
            req.body.termsAndConditions = new Map(Object.entries(termsAndConditions));
        }

        const created = await Tour.create({
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

exports.updateTour = async function (req, res) {
    const { id } = req.params;
    const { termsAndConditions, ...body } = req.body;
    try {
        const images = req.files ? req.files.map((file) => file.location) : [];

        if (termsAndConditions && typeof termsAndConditions === 'object') {
            req.body.termsAndConditions = new Map(Object.entries(termsAndConditions));
        }

        const updated = await Tour.findByIdAndUpdate(id, {
            ...body,
            images,
            termsAndConditions: req.body.termsAndConditions,
        }, { new: true });

        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to update travel' });
    }
};

exports.sortByOrder = async function (req, res) {
    try {
        const { sort } = req.query;
        let sortOrder = 1;
        if (sort === 'desc') sortOrder = -1;
        else if (sort !== 'asc') {
            return res.status(400).json({ message: 'Invalid sort parameter. Use "asc" or "desc".' });
        }

        const travels = await Tour.find({ isAccepted: true }).sort({ price: sortOrder });
        res.json(travels);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching travels', error });
    }
};

exports.sortByPrice = async (req, res) => {
    const { minPrice, maxPrice } = req.query;

    try {
        const query = { isAccepted: true };

        if (minPrice) query.price = { $gte: minPrice };
        if (maxPrice) query.price = { ...query.price, $lte: maxPrice };

        const findData = await Tour.find(query);
        return res.json(findData);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.sortByDuration = async (req, res) => {
    const { minNights, maxNights } = req.query;

    try {
        let query = { isAccepted: true };
        if (minNights) query.nights = { ...query.nights, $gte: parseInt(minNights) };
        if (maxNights) query.nights = { ...query.nights, $lte: parseInt(maxNights) };

        const findData = await Tour.find(query);
        return res.json(findData);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.sortBythemes = async (req, res) => {
    try {
        const { themes } = req.query;
        const findData = await Tour.find({ themes: themes, isAccepted: true });
        return res.json(findData);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getTravelList = async function (_, res) {
    try {
        const findData = await Tour.find({ isAccepted: true });
        return res.status(200).json(findData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getTravelById = async (req, res) => {
    try {
        const { id } = req.params;
        const findData = await Tour.findOne({ _id: id, isAccepted: true });
        return res.status(200).json(findData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getByCity = async function (req, res) {
    const { city } = req.query;
    try {
        const query = city
            ? { city: { $regex: city, $options: 'i' }, isAccepted: true }
            : { isAccepted: true };

        const results = await Tour.find(query);
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to retrieve data' });
    }
};

exports.getAllCities = async (req, res) => {
    try {
        const findAll = await Tour.find({ isAccepted: true });
        if (findAll && findAll.length > 0) {
            const cities = [...new Set(findAll.map((travel) => travel.city))];
            res.status(200).json(cities);
        } else {
            res.status(404).json({ message: "No cities found." });
        }
    } catch (error) {
        return res.status(500).json("It seems there's an error!");
    }
};

exports.getRequestedTravels = async (req, res) => {
    try {
        const requestedTravels = await Tour.find({ isAccepted: false });
        res.status(200).json(requestedTravels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}