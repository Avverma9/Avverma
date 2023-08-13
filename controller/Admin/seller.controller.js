const { default: mongoose } = require('mongoose');
const sellerModel = require('../../model/Admin/seller.model');
const auctionModel = require('../../model/auction.model');

exports.add = async (req, res) => {
    try {
        const loggedInUser = req.decoded
        if (!loggedInUser || loggedInUser.role != 1) {
            return res.json({
                status: 0,
                message: "Not Authorized",
            })
        }

        const { name } = req.body;
        if (!name) {
            return res.json({
                status: false,
                message: "Name is a required field"
            });
        }

        const newCategory = new sellerModel({ name });
        const savedCategory = await newCategory.save();

        return res.json({
            status: true,
            message: "seller created successfully",
            data: savedCategory
        });
    } catch (error) {
        return res.json({
            status: false,
            message: "Something went wrong",
            data: error
        });
    }
}

exports.getAll = async (req, res) => {
    const loggedInUser = req.decoded
    if (!loggedInUser || loggedInUser.role != 1) {
        return res.json({
            status: 0,
            message: "Not Authorized",
        })
    }

    await sellerModel.find()
        .then(success => {
            return res.json({
                status: true,
                message: "all sellers",
                data: success
            })
        })
        .catch(error => {
            return res.json({
                status: false,
                message: "something went wrong", error,
            })
        })
}

exports.get = async (req, res) => {
    const loggedInUser = req.decoded
    if (!loggedInUser || loggedInUser.role != 1) {
        return res.json({
            status: 0,
            message: "Not Authorized",
        })
    }

    const { sellerId } = req.params

    await sellerModel.findById({ _id: sellerId })
        .then(success => {
            return res.json({
                status: true,
                message: "seller",
                data: success
            })
        })
        .catch(error => {
            return res.json({
                status: false,
                message: "something went wrong", error,
            })
        })
}

exports.delete = async (req, res) => {
    const loggedInUser = req.decoded
    if (!loggedInUser || loggedInUser.role != 1) {
        return res.json({
            status: 0,
            message: "Not Authorized",
        })
    }

    const { sellerId } = req.params

    await sellerModel.findByIdAndDelete({ _id: sellerId })
        .then(success => {
            return res.json({
                status: true,
                message: "seller deleted",
                data: success
            })
        })
        .catch(error => {
            return res.json({
                status: false,
                message: "something went wrong", error,
            })
        })
}

exports.update = async (req, res) => {
    const loggedInUser = req.decoded
    if (!loggedInUser || loggedInUser.role != 1) {
        return res.json({
            status: 0,
            message: "Not Authorized",
        })
    }

    const update_data = req.body
    const { sellerId } = req.params

    await sellerModel.findByIdAndUpdate({ _id: sellerId },
        {
            $set: update_data
        })
        .then(success => {
            return res.json({
                status: true,
                message: "seller updated",
                data: success
            })
        })
        .catch(error => {
            return res.json({
                status: false,
                message: "something went wrong", error,
            })
        })

}


exports.getSellerByRegion = async (req, res) => {
    const { regionId } = req.params

    if (!regionId) {
        return res.json({
            status: false,
            message: "please provide regionId"
        })
    }

    // await auctionModel.find({ region: mongoose.Types.ObjectId(regionId) })
    await auctionModel.aggregate([
        {
            $match: { region: mongoose.Types.ObjectId(regionId) }
        },
        {
            $lookup: {
                from: "sellers",
                foreignField: "_id",
                localField: "seller",
                as: "seller"
            }
        },
        {
            $lookup: {
                from: "categories",
                foreignField: "_id",
                localField: "category",
                as: "categories"
            }
        },
        {
            $lookup: {
                from: "regions",
                foreignField: "_id",
                localField: "region",
                as: "region"
            }
        }
    ])
        .then(success => {
            return res.json({
                status: true,
                message: "auctions",
                data: success
            })
        })
        .catch(error => {
            return res.json({
                status: false,
                message: "something went wrong"
            })
        })
}