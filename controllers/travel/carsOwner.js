const Owner = require('../../models/travel/carOwner');

exports.addOwner = async (req, res) => {
    try {
        const { mobile, ...data } = req.body;
        const images = req.files?.map((file) => file.location);
        const dlImage = req.files?.map((file) => file.location);

        const existingOwner = await Owner.findOne({ mobile });
        if (existingOwner) {
            return res.status(400).json({ error: 'Mobile number already exists.' });
        }
        await Owner.create({ ...data, images, dlImage });
        return res.status(201).json('Successfully Created');
    } catch (error) {
        return res.status(500).json('We are working hard to fix this');
    }
};

exports.getOwner = async (_, res) => {
    try {
        const findData = await Owner.find();
        return res.status(200).json(findData);
    } catch (error) {
        return res.status(500).json('We are working hard to fix this');
    }
};

exports.getOwnerById = async (req, res) => {
    try {
        const { id } = req.params;
        const findData = await Owner.findById(id);
        return res.status(200).json(findData);
    } catch (error) {
        return res.status(500).json('We are working hard to fix this');
    }
};

exports.updateOwner = async (req, res) => {
    const { id } = req.params;
    const { ...data } = req.body;
    const images = req.files?.map((file) => file.location);
    const findImage = await Owner.findById(id);
    if (images.length === 0 && findImage.images) {
        data.images = findImage.images;
    } else {
        data.images = images;
    }
    const updateData = await Owner.findByIdAndUpdate({ id, ...data, images });
    return res.staus(201).json({ message: 'Successfully Updated', updateData });
};

exports.deleteOwner = async (req, res) => {
    try {
        const { id } = req.params;
        await Owner.findByIdAndDelete(id);
        return res.staus(200).json({ message: 'Successfully Deleted' });
    } catch (error) {
        return res.status(500).json('We are working hard to fix this');
    }
};
