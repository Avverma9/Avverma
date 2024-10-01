const Dashboard = require('../models/dashboardUser');

// Register ===========================
const registerUser = async (req, res) => {
    try {
        const { name, email, mobile, password, role, address } = req.body;
        const emailExist = await Dashboard.findOne({ email: email });
        const mobileExist = await Dashboard.findOne({ mobile: mobile });
        if (role !== 'admin' && role !== 'superAdmin' && role !== 'PMS') {
            return res.status(400).json({ message: 'Invalid role selection' });
        }
        if (emailExist) {
            return res.status(400).json({ message: 'Email already existed' });
        }
        if (mobileExist) {
            return res.status(400).json({ message: 'Mobile already existed' });
        }
        const images = req.files.map((file) => file.location);
        const created = await Dashboard.create({
            images,
            name,
            email,
            role,
            address,
            mobile,
            password,
        });
        res.status(201).json({ message: 'Registration Done', created });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

//Login ====

const loginUser = async function (req, res) {
    const { email, password } = req.body;
    const emailRegex = new RegExp('^' + email + '$', 'i'); // "i" flag for case-insensitive search

    try {
        let loggedUser = await Dashboard.findOne({
            email: emailRegex,
            password: password,
        });

        if (!loggedUser) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if user status is active
        if (loggedUser.status !== true) {
            return res.status(400).json({ message: 'User account is not active' });
        }

        // User is authenticated and active
        res.status(200).json({
            message: 'Logged in as',
            loggedUserRole: loggedUser.role,
            loggedUserStatus: loggedUser.status,
            loggedUserImage: loggedUser.images,
            loggedUserId: loggedUser._id,
            loggedUserName: loggedUser.name,
            loggedUserEmail: loggedUser.email,
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//update status
const updateStatus = async (req, res) => {
    const { id } = req.params; // Extracting id from parameters
    const { status } = req.body; // Extracting status from request body

    try {
        // Attempt to find and update the document with the new status
        const updateData = await Dashboard.findByIdAndUpdate(
            id,
            { status: status },
            { new: true } // This option will return the document after update was applied
        );

        // If no document is found, send a 404 error
        if (!updateData) {
            return res.status(404).send({ message: 'Dashboard not found with provided ID.' });
        }

        // Send back the updated document
        res.status(200).send(updateData);
    } catch (error) {
        // If an error occurs during the update, send a 500 internal server error
        res.status(500).send({
            message: 'Error updating the dashboard status',
            error: error.message,
        });
    }
};

//get all users
const getPartners = async function (req, res) {
    const fetchUser = await Dashboard.find();
    res.json(fetchUser);
};
//delete
const getPartnersById = async(req,res)=>{
    const {id}= req.params
    const fetchUser = await Dashboard.findById(id)
    res.json(fetchUser)
}
const deletePartner = async function (req, res) {
    const { id } = req.params;
    const deleted = await Dashboard.findByIdAndDelete(id);
    res.status(200).json({ message: 'this user is successfully deleted' });
};
//update

const updatePartner = async function (req, res) {
    const { id } = req.params;
    const { name, email, mobile, password, status, role, address } = req.body;

    let images = [];

    try {
        // Check if there are uploaded files
        if (req.files && req.files.length > 0) {
            images = req.files.map((file) => file.location);
        } else {
            // If no files uploaded, retain existing images from the database
            const user = await Dashboard.findById(id);
            if (user) {
                images = user.images;
            }
        }

        const updateFields = {
            name,
            email,
            mobile,
            password,
            status,
            role,
            address,
            images,
        };

        // Validate email uniqueness
        if (updateFields.email) {
            const alreadyRegistered = await Dashboard.findOne({
                email: updateFields.email,
                _id: { $ne: id }, // Exclude current partner
            });
            if (alreadyRegistered) {
                return res.status(400).json({ message: 'Email already registered' });
            }
        }

        // Validate mobile uniqueness
        if (updateFields.mobile) {
            const mobileExist = await Dashboard.findOne({
                mobile: updateFields.mobile,
                _id: { $ne: id }, // Exclude current partner
            });
            if (mobileExist) {
                return res.status(400).json({ message: 'Mobile number already exists' });
            }
        }

        // Perform update operation
        const partnerUpdated = await Dashboard.findByIdAndUpdate(id, updateFields, {
            new: true,
        });

        if (!partnerUpdated) {
            return res.status(404).json({ message: 'Partner not found' });
        }

        res.status(200).json({ message: 'User successfully updated', partner: partnerUpdated });
    } catch (error) {
        console.error('Error updating partner:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addMenu = async (req, res) => {
    const { id } = req.params;
    const { menuItem } = req.body;

    try {
        const user = await Dashboard.findByIdAndUpdate(id, { $push: { menuItems: menuItem } }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMenu = async (req,res)=>{
  const { id } = req.params;
  const { menuItem } = req.body;

  try {
      const user = await dashboardUser.findByIdAndUpdate(
          id,
          { $pull: { menuItems: menuItem } },
          { new: true }
      );

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

module.exports = {
    registerUser,
    loginUser,
    getPartners,
    deletePartner,
    updatePartner,
    updateStatus,
    addMenu,
    deleteMenu,
    getPartnersById
};
