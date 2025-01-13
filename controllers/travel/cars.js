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
