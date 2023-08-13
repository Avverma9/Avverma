const express = require('express');
const router = express.Router();
const AuctionModel = require('../../model/Admin/auction.model'); // Import your Auction model
const RegionModel = require('../../model/Admin/region.model'); // Import your Auction model
const categoryModel = require('../../model/Admin/category.model');
const sellerModel = require('../../model/Admin/seller.model');
const { default: mongoose } = require('mongoose');

// Create a new auction
exports.add = async (req, res) => {
    const { region, category, seller, productName, registrationNumber,
        agreementNumber, rc, rc_name, startPrice, reservePrice,
        startTime, endTime, parkingName, parkingAddress,
        yearOfManufacture, paymentTerm, quotationValidity,
        auctionFees, auctionTerm, otherInformation, photoVideo,
        valuationFile } = req.body

    if (!region || !category || !seller || !productName || !registrationNumber || !
        agreementNumber || !rc || !rc_name || !startPrice || !reservePrice
        || !startTime || !endTime || !parkingName || !parkingAddress) {
        return res.json({
            status: false,
            message: `region, category, seller, productName, registrationNumber,
                    agreementNumber, rc, rc_name, startPrice, reservePrice,
                    startTime, endTime, parkingName, parkingAddress are required values`
        })
    }

    const isRegionPresent = await RegionModel.findById({ _id: region })
    const isCategoryPresent = await categoryModel.findById({ _id: category })
    const isSellerPresent = await sellerModel.findById({ _id: seller })

    if (!isRegionPresent) {
        return res.json({
            status: false,
            message: "invalid region"
        })
    }

    if (!isCategoryPresent) {
        return res.json({
            status: false,
            message: "invalid category"
        })
    }

    if (!isSellerPresent) {
        return res.json({
            status: false,
            message: "invalid seller"
        })
    }

    const isAuctionPresent = await AuctionModel.find({
        $and: [
            { seller: mongoose.Types.ObjectId(seller) },
            { category: mongoose.Types.ObjectId(category) },
            { region: mongoose.Types.ObjectId(region) }
        ]
    })
    if (isAuctionPresent.length != 0) {
        return res.json({
            status: false,
            message: "auction for this user is already added",
            data: isAuctionPresent
        })
    }
    await new AuctionModel({
        region: region,
        category: category,
        seller: seller,
        productName: productName,
        registrationNumber: registrationNumber,
        agreementNumber: agreementNumber,
        rc: rc,
        rc_name: rc_name,
        startPrice: startPrice,
        reservePrice: reservePrice,
        startTime: startTime,
        endTime: endTime,
        parkingName: parkingName,
        parkingAddress: parkingAddress,
        yearOfManufacture: yearOfManufacture,
        paymentTerm: paymentTerm,
        quotationValidity: quotationValidity,
        auctionFees: auctionFees,
        auctionTerm: auctionTerm,
        otherInformation: otherInformation,
        photoVideo: photoVideo,
        valuationFile: valuationFile
    })
        .save()
        .then(savedAuction => {
            return res.json({
                status: true,
                message: "Auction created successfully",
                data: savedAuction
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: "Something went wrong",
                error: error
            });
        });
}


// Get all auctions
exports.getAll = async (req, res) => {
    // AuctionModel.find()
    AuctionModel.aggregate([
        {
            $match: {}
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
        .then(auctions => {
            return res.json({
                status: true,
                message: "All auctions",
                data: auctions
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: "Something went wrong",
                error: error
            });
        });
}


// Get auction by ID
exports.get = async (req, res) => {
    const { auctionId } = req.params;

    AuctionModel.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(auctionId) }
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
        .then(auction => {
            return res.json({
                status: true,
                message: "Auction",
                data: auction
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: "Something went wrong",
                error: error
            });
        });
}


// Update auction by ID
exports.update = async (req, res) => {
    const { auctionId } = req.params;
    const updateData = req.body;

    AuctionModel.findByIdAndUpdate(auctionId, { $set: updateData }, { new: true })
        .then(updatedAuction => {
            return res.json({
                status: true,
                message: "Auction updated",
                data: updatedAuction
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: "Something went wrong",
                error: error
            });
        });
}


// Delete auction by ID
exports.delete = async (req, res) => {
    const { auctionId } = req.params;

    AuctionModel.findByIdAndDelete(auctionId)
        .then(deletedAuction => {
            return res.json({
                status: true,
                message: "Auction deleted",
                data: deletedAuction
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: "Something went wrong",
                error: error
            });
        });
}



exports.getAuctionByCategory = async (req, res) => {
    const { categoryId } = req.params

    if (!categoryId) {
        return res.json({
            status: false,
            message: "please provide categoryId"
        })
    }

    // await auctionModel.find({ region: mongoose.Types.ObjectId(regionId) })
    await AuctionModel.aggregate([
        {
            $match: { category: mongoose.Types.ObjectId(categoryId) }
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