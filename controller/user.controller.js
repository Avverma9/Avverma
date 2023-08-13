const userModel = require('../model/user.model')
const mailMiddleware = require('../middleware/mail.middleware')
const jwtMiddleware = require('../middleware/auth')
const fs = require('fs-extra')
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = process.env;


exports.createUser = async (req, res) => {
    let { full_name, company_name, company_address, email, mobile, password, photo, DOB, region, PanNumber } = req.body

    const isUserFound = await userModel.findOne({ $or: [{ email: email }, { mobile: mobile }] })
    if (isUserFound) {
        return res.json({
            success: false,
            message: "user already exist please login"
        })
    }

    const hashed_password = await bcrypt.hash(password, 10);

    if (!req.file)
        return res.json({
            status: false,
            message: `please select image`,
        });

    const PAN = req.file.filename;
    console.log("PAN==>", PAN)
    await new userModel({
        full_name: full_name,
        company_name: company_name,
        company_address: company_address,
        email: email,
        mobile: mobile,
        password: hashed_password,
        DOB: DOB,
        photo: '',
        Pan: PAN,
        region: region,
        PanNumber: PanNumber
    }).save()
        .then(async (success) => {

            return res.json({
                success: true,
                message: `user registered`,
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                success: false,
                message: "something went wrong", error
            })
        })
}

exports.updateUser = async (req, res) => {
    const { userId } = req.params
    const { full_name, company_name, company_address, email, mobile, DOB } = req.body


    if (!userId)
        return res.json({
            status: false,
            message: `please select user_id`,
        })

    const users = await userModel.findById({ _id: userId })
    if (users == null || !users)
        return res.json({
            status: false,
            message: `invalid user_id`
        })

    const displayPhoto = req.file.filename
    await userModel.findOneAndUpdate({
        _id: mongoose.Types.ObjectId(userId)
    },
        {
            $set: {
                full_name: full_name,
                company_name: company_name,
                company_address: company_address,
                email: email,
                mobile: mobile,
                password: hashed_password,
                DOB: DOB,
                Pan: displayPhoto
            }
        })
        .then((success) => {
            return res.json({
                success: true,
                message: `user updated`,
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                success: false,
                message: "something went wrong", error
            })
        })
}

exports.login = async (req, res) => {
    let { username, password } = req.body;

    let isUserFound = await userModel.aggregate([
        {
            $match: { $or: [{ email: username }, { mobile: username }] }
        },
        {
            $lookup: {
                from: "regions",
                localField: "region",
                foreignField: "_id",
                as: "regionData"
            }
        },
        {
            $unwind: "$regionData"
        },
        {
            $group: {
                _id: "$_id",
                full_name: { $first: "$full_name" },
                email: { $first: "$email" },
                mobile: { $first: "$mobile" },
                password: { $first: "$password" },
                company_name: { $first: "$company_name" },
                company_address: { $first: "$company_address" },
                DOB: { $first: "$DOB" },
                Pan: { $first: "$Pan" },
                isApprovedByAdmin: { $first: "$isApprovedByAdmin" },
                userPaymentId: { $first: "$userPaymentId" },
                photo: { $first: "$photo" },
                regions: { $push: "$regionData" } // Group the regions into an array
            }
        }
    ]);

    isUserFound = isUserFound[0]
    if (!isUserFound) {
        return res.json({
            success: false,
            message: "User not registered, please register."
        });
    }
    console.log(isUserFound[0])

    if (bcrypt.compareSync(password, isUserFound.password)) {
        const token = await jwt.sign({ id: isUserFound._id }, JWT_TOKEN, { expiresIn: '50d' });
        return res.json({
            success: true,
            message: "Logged in.",
            data: isUserFound,
            token: token
        });
    } else {
        return res.json({
            success: false,
            message: "Incorrect password."
        });
    }
};

exports.resetPassword = async (req, res) => {
    let { userId, newPassword } = req.body


    const isUserFound = await userModel.findOne({ _id: mongoose.Types.ObjectId(userId) })
    console.log(isUserFound)
    if (!isUserFound) {
        return res.json({
            success: false,
            message: "user not registered please register"
        })
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10)
    await userModel.findByIdAndUpdate({ _id: isUserFound._id },
        {
            $set: {
                password: hashedNewPassword
            }
        })
        .then((success) => {
            console.log(success)
            if (success) {
                return res.json({
                    success: true,
                    message: "password changed successfully"
                })
            }
            x
        })
        .catch((error) => {
            return res.json({
                success: false,
                message: "error while changing password"
            })
        })
}

exports.isUserExist = async (req, res) => {
    let { username } = req.params

    // let error_message = `please enter`

    // if (!username) {
    //     error_message += `, email`
    // }

    // if (error_message !== "please enter") {
    //     return res.json({
    //         success: false,
    //         message: error_message
    //     })
    // }

    const isUserFound = await userModel.findOne({ $or: [{ email: username }, { mobile: username }] })
    if (!isUserFound) {
        return res.json({
            success: false,
            message: "email not registered"
        })
    }
    else {
        return res.json({
            success: true,
            message: "user found"
        })
    }

}

exports.getUser = async (req, res) => {
    let { userId } = req.params


    let isUserFound = await userModel.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(userId) }
        },
        {
            $lookup: {
                from: "regions",
                localField: "region",
                foreignField: "_id",
                as: "regionData"
            }
        },
        {
            $unwind: "$regionData"
        },
        {
            $group: {
                _id: "$_id",
                full_name: { $first: "$full_name" },
                email: { $first: "$email" },
                mobile: { $first: "$mobile" },
                password: { $first: "$password" },
                company_name: { $first: "$company_name" },
                company_address: { $first: "$company_address" },
                DOB: { $first: "$DOB" },
                Pan: { $first: "$Pan" },
                isApprovedByAdmin: { $first: "$isApprovedByAdmin" },
                userPaymentId: { $first: "$userPaymentId" },
                photo: { $first: "$photo" },
                regions: { $push: "$regionData" } // Group the regions into an array
            }
        }
    ]);
    if (isUserFound.length == 0) {
        return res.json({
            success: false,
            message: "user not found"
        })
    }
    else {
        return res.json({
            success: true,
            message: "user details",
            data: isUserFound
        })
    }

}

exports.deleteUser = async (req, res) => {
    let { userId } = req.params

    // let error_message = `please enter`

    // if (!username) {
    //     error_message += `, email`
    // }

    // if (error_message !== "please enter") {
    //     return res.json({
    //         success: false,
    //         message: error_message
    //     })
    // }

    const isUserFound = await userModel.findOneAndDelete({ userId: mongoose.Types.ObjectId(userId) })
        .then((success) => {
            return res.json({
                success: true,
                message: "user deleted",
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                success: true,
                message: "something went wrong",
            })
        })
}

/* ---------- remove profile image ------------ */
exports.remove_profile_img = async (req, res) => {
    const { user_id } = req.body

    if (!user_id)
        return res.json({
            status: false,
            message: `please select user_id`,
        })

    const users = await userModel.findById({ _id: user_id })
    if (users == null || !users)
        return res.json({
            status: false,
            message: `invalid user_id`
        })

    user.findByIdAndUpdate({ _id: user_id },
        {
            $set: {
                displayPhoto: null
            }
        },
        { returnOriginal: true }
    )
        .then(async (success) => {
            let filename = success.displayPhoto
            await fs.remove(`./public/profile_images/${filename}`); // remove upload dir when uploaded bucket

            return res.json({
                status: true,
                message: `profile image removed`,
            })
        })
}

/* ---------- update profile image ------------ */
exports.add_profile_image = async (req, res) => {
    const { user_id } = req.params


    if (!req.file)
        return res.json({
            status: false,
            message: `please select image`,
        })

    if (!user_id)
        return res.json({
            status: false,
            message: `please select user_id`,
        })

    const users = await userModel.findById({ _id: user_id })
    if (users == null || !users)
        return res.json({
            status: false,
            message: `invalid user_id`
        })


    const displayPhoto = req.file.filename
    console.log(displayPhoto)
    userModel.findByIdAndUpdate({ _id: user_id },
        {
            $set: { photo: displayPhoto }
        },
        { returnOriginal: true }
    )
        .then(async (success) => {
            console.log(success)
            let filename = success.photo
            let root_url = req.protocol + "://" + req.headers.host
            let profile_url = root_url + "/profile_images/" + displayPhoto
            // await fs.remove(`./public/profile_images/${filename}`); // remove image from bucket

            return res.json({
                status: true,
                message: `profile image updated successfully`,
                data: {
                    user_id: success._id,
                    profile_images: profile_url
                }
            })
        })
        .catch((error) => {
            return res.json({
                status: false,
                message: `error`, error
            })
        })
}

exports.sendOtpOnMobile = async (req, res) => {
    const { mobile } = req.params
    const twilio = require('twilio');

    const accountSid = 'AC72fc445885973171de671fdcf71deaeb';
    const authToken = 'd2620034d1e61efd92239f84d9b6a15c';
    const client = require('twilio')(accountSid, authToken);

    const min = 1000; // Minimum 6-digit number
    const max = 9999; // Maximum 6-digit number
    const otp = await Math.floor(Math.random() * (max - min + 1)) + min;

    client.messages
        .create({
            body: `Hi, Your otp is ${otp}`,
            from: '+14013869717',
            to: `+91${mobile}`
        })
        .then((success) => {
            return res.json({
                success: true,
                message: `otp send on ${mobile}`,
                data: success
            })
        })
        .catch((error) => {
            return res.json({
                success: true,
                message: "something went wrong", error
            })
        })

}