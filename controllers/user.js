const userModel = require('../models/user');
const jwt = require('jsonwebtoken'); // Import the JWT library
require('dotenv').config(); // Load environment variables

//====================================================================================
const createSignup = async function (req, res) {
    try {
        const userImage = req.files.map((file) => file.location);

        const userData = {
            userImage,
            ...req.body,
        };

        const savedUser = await userModel.create(userData);

        return res.status(201).send({
            status: true,
            message: 'User has been created successfully',
            data: savedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//======================================================
const getUserById = async function (req, res) {
    try {
        let userId = req.params.userId;

        let checkData = await userModel.findOne({ userId: userId });
        if (!checkData) {
            return res.status(404).send({ status: false, message: 'userId not exist' });
        }

        return res.status(200).send({
            status: true,
            message: 'Users Profile Details',
            data: checkData,
        });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};
//=====================================Google Sign in=================================

const GoogleSignIn = async function (req, res) {
    try {
        const { email, uid, userName, images } = req.body;

        // Check if the user already exists based on email or UID
        const existingUser = await userModel.findOne({ $or: [{ email }, { uid }] });

        if (existingUser) {
            // If user already exists, generate a JWT token
            const rsToken = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            return res.status(201).json({ message: 'User already exists', userId: existingUser.userId, token: rsToken });
        }

        // If user doesn't exist, create a new user
        const user = await userModel.create({ email, uid, userName, images });
        const rsToken = jwt.sign({ id: user.userId }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({ message: 'Sign-in successful', userId: user.userId, token: rsToken });
    } catch (error) {
        // Handle any errors that might occur during the process
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//==============================================SIGN IN==============================

const signIn = async function (req, res) {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await userModel.findOne({ email });

        // If user does not exist
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the provided password matches the stored password
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const rsToken = jwt.sign({ id: user.userId }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Return success response with token
        res.status(200).json({ message: 'Sign-in successful', userId: user.userId, token: rsToken });
    } catch (error) {
        console.error('Sign-in error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//==========================get count of users===========================//
const totalUser = async function (req, res) {
    try {
        const getall = await userModel.countDocuments({});
        res.status(200).json(getall);
    } catch (error) {
        console.error('Error fetching total users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//=====================================================================
const update = async (req, res) => {
    try {
        const auth = req.user.id;
        const { userId, userName, address, email, mobile, password } = req.body;
        let images = [];
        if (auth !== userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        if (req.files && req.files.length > 0) {
            images = req.files.map((file) => file.location);
        } else {
            const user = await userModel.findOne({ userId }); // Find user by custom ID
            if (user) {
                images = user.images;
            }
        }

        const updatedUser = await userModel.findOneAndUpdate(
            { userId }, // Find user by custom ID
            {
                userName,
                address,
                email,
                mobile,
                password,

                images,
            },
            { new: true }
        );

        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

//===============================================================================
const getAllUsers = async (req, res) => {
    try {
        const auth = req.user.id;

        if (!auth) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const userData = await userModel.find();
        return res.status(200).json({
            message: 'User data fetched successfully',
            data: userData,
        });
    } catch (error) {
        console.error('Error fetching user data:', error); // Log error for debugging
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message, // Optionally include the error message
        });
    }
};

module.exports = {
    createSignup,
    getUserById,
    signIn,
    GoogleSignIn,
    update,
    getAllUsers,
    totalUser,
};
