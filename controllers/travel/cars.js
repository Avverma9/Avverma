const Car = require('../../models/travel/cars');

exports.addCar = async (req, res) => {
    try {
        const { ...data } = req.body;
        const images = req.files?.map((file) => file.location) || [];
        await Car.create({ ...data, images });
        return res.status(201).json('Successfully Created');
    } catch (error) {
        return res.status(500).json('We are working hard to fix this');
    }
};

exports.getAllCars = async (_, res) => {
    try {
        const findData = await Car.find();
        return res.status(200).json(findData);
    } catch (error) {
        return res.status(500).json('We are working hard to fix this');
    }
};

exports.getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const findCar = await Car.findById(id);
        if (!findCar) return res.status(404).json('Car not found');
        return res.status(200).json(findCar);
    } catch (error) {
        return res.status(500).json('We are working hard to fix this');
    }
};

exports.filterCar = async (req, res) => {
    try {
        const { make, model, fuelType, seater , from, to } = req.query;
        const query = {};

        if (make) query.make = make;
        if(from) query.from = from;
        if(to) query.to = to;
        if (model) query.model = model;
        if (fuelType) query.fuelType = fuelType;
        if (seater) query.seater = seater;

        if (Object.keys(query).length === 0) {
            return res.status(400).json({ message: "No filter parameters provided" });
        }

        const cars = await Car.find(query);

        if (cars.length === 0) {
            return res.status(404).json({ message: "No cars found matching the filters" });
        }

        return res.status(200).json(cars);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while fetching cars", error: error.message });
    }
};

exports.updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { ...data } = req.body;
        const images = req.files?.map((file) => file.location) || [];
        const findCar = await Car.findById(id);
        if (!findCar) return res.status(404).json('Car not found');
        data.images = images.length > 0 ? images : findCar.images;
        const updateData = await Car.findByIdAndUpdate(id, { ...data });
        return res.status(200).json({ message: 'Successfully Updated', updateData });
    } catch (error) {
        return res.status(500).json('We are working hard to fix this');
    }
};

exports.deleteCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const findCar = await Car.findById(id);
        if (!findCar) return res.status(404).json('Car not found');
        await Car.findByIdAndDelete(id);
        return res.status(200).json('Successfully deleted');
    } catch (error) {
        return res.status(500).json('We are working hard to fix this');
    }
};
