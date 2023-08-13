const adminModel = require('../../model/Admin/admin.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const sellerModel = require('../../model/Admin/seller.model');
const regionModel = require('../../model/Admin/region.model');
const categoryModel = require('../../model/Admin/category.model');
const AuctionModel = require('../../model/Admin/auction.model');
const userModel = require('../../model/user.model');
const auctionModel = require('../../model/auction.model');

const { JWT_TOKEN } = process.env;


exports.createAdmin = async (req, res) => {
    let { name, email, mobile, password, role, region, state } = req.body;

    const isUserFound = await adminModel.findOne({ $or: [{ email: email }, { mobile: mobile }] });
    if (isUserFound) {
        return res.json({
            success: false,
            message: "Admin already exists"
        });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    await new adminModel({
        name: name,
        email: email,
        mobile: mobile,
        password: hashed_password,
        role: role,
        region: region,
        state: state
    }).save()
        .then(success => {
            return res.json({
                status: true,
                message: "admin account created",
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

exports.login = async (req, res) => {
    let { username, password } = req.body

    let error_message = `please enter`

    if (!username) {
        error_message += `, email`
    }
    if (!password) {
        error_message += `, password`
    }

    if (error_message !== "please enter") {
        return res.json({
            success: false,
            message: error_message
        })
    }


    // const isUserFound = await adminModel.findOne({ $or: [{ email: username }, { mobile: username }] })
    let isUserFound = await adminModel.aggregate([
        {
            $match: { $or: [{ email: username }, { mobile: username }] }
        },
        {
            $lookup: {
                from: 'regions',
                let: { regionIds: '$region' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $in: ['$_id', '$$regionIds'] }
                        }
                    }
                ],
                as: 'regionData'
            }
        }
    ])

    if (isUserFound.length > 0) {
        isUserFound = isUserFound[0]
    }
    if (isUserFound)
        if (isUserFound.status == 0) {
            return res.json({
                status: false,
                message: "your status is not active"
            })
        }
    console.log(isUserFound)
    if (!isUserFound) {
        return res.json({
            success: false,
            message: "user not registered please register"
        })
    }

    if (bcrypt.compareSync(password, isUserFound.password)) {

        const token = await jwt.sign({ id: isUserFound._id, role: isUserFound.role }, JWT_TOKEN, { expiresIn: '100000d' });
        return res.json({
            success: true,
            message: `logged in`,
            data: isUserFound,
            token: token
        })
    }
    else {
        return res.json({
            success: false,
            message: `incorrect password`
        })
    }
}

exports.getAllAdmins = async (req, res) => {
    const loggedInUser = req.decoded
    if (!loggedInUser || loggedInUser.role != 1) {
        return res.json({
            status: 0,
            message: "Not Authorized",
        })
    }

    // await adminModel.find()
    await adminModel.aggregate([
        {
            $match: {}
        },
        {
            $lookup: {
                from: 'regions',
                let: { regionIds: '$region' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $in: ['$_id', '$$regionIds'] }
                        }
                    }
                ],
                as: 'regionData'
            }
        }

    ])
        .then(success => {
            return res.json({
                status: true,
                message: "admins",
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

exports.updateAdmin = async (req, res) => {
    const loggedInUser = req.decoded
    if (!loggedInUser || loggedInUser.role != 1) {
        return res.json({
            status: 0,
            message: "Not Authorized",
        })
    }

    const update_data = req.body
    const { adminId } = req.params

    await adminModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(adminId) },
        {
            $set: update_data
        })
        .then(success => {
            return res.json({
                status: true,
                message: "admin updated",
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

exports.getAdmin = async (req, res) => {
    const loggedInUser = req.decoded
    if (!loggedInUser) {
        return res.json({
            status: 0,
            message: "Not Authorized",
        })
    }
    const { adminId } = req.params

    await adminModel.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(adminId) }
        },
        {
            $lookup: {
                from: 'regions',
                let: { regionIds: '$region' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $in: ['$_id', '$$regionIds'] }
                        }
                    }
                ],
                as: 'regionData'
            }
        }
    ])
        .then(success => {
            return res.json({
                status: true,
                message: "admin",
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

exports.getCount = async (req, res) => {
    const totalSeller = await sellerModel.countDocuments({})
    const totalregion = await regionModel.countDocuments({})
    const totalCategory = await categoryModel.countDocuments({})
    const users = await userModel.find({})
    const totalSubAdmin = await adminModel.countDocuments({})
    const totalAuctio = await AuctionModel.find()
    const totalActiveSubAdmin = await adminModel.countDocuments({ status: 0 })

    return res.json({
        status: 1,
        data: {
            count: {
                totalSeller: totalSeller,
                totalregionn: totalregion,
                totalCategory: totalCategory,
                users: users,
                totalActiveSubAdmin: totalActiveSubAdmin,
                totalAuction: totalAuctio,
                totalSubAdmin: totalSubAdmin
            }
        }
    })

}
