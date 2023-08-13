const regionModel = require('../../model/Admin/region.model');

exports.addRegion = (req, res) => {
    const loggedInUser = req.decoded;
    if (!loggedInUser || loggedInUser.role !== 1) {
        return res.json({
            status: 0,
            message: "Not Authorized"
        });
    }

    const { name } = req.body;
    if (!name) {
        return res.json({
            status: false,
            message: "Name is a required field"
        });
    }

    const newRegion = new regionModel({ name });
    newRegion.save()
        .then(savedRegion => {
            return res.json({
                status: true,
                message: "Region added successfully",
                data: savedRegion
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: "Something went wrong",
                data: error
            });
        });
};

exports.getAllRegions = (req, res) => {
   

    regionModel.find()
        .then(regions => {
            return res.json({
                status: true,
                message: "Regions retrieved successfully",
                data: regions
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: "Something went wrong",
                data: error
            });
        });
};

exports.getRegion = (req, res) => {
   
    const { regionId } = req.params;
    regionModel.findById(regionId)
        .then(region => {
            return res.json({
                status: true,
                message: "Region retrieved successfully",
                data: region
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: "Something went wrong",
                data: error
            });
        });
};

exports.updateRegion = (req, res) => {
    const loggedInUser = req.decoded;
    if (!loggedInUser || loggedInUser.role !== 1) {
        return res.json({
            status: 0,
            message: "Not Authorized"
        });
    }

    const { regionId } = req.params;
    const updateData = req.body;

    regionModel.findByIdAndUpdate(regionId, { $set: updateData }, { new: true })
        .then(updatedRegion => {
            return res.json({
                status: true,
                message: "Region updated successfully",
                data: updatedRegion
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: "Something went wrong",
                data: error
            });
        });
};

exports.deleteRegion = (req, res) => {
    const loggedInUser = req.decoded;
    if (!loggedInUser || loggedInUser.role !== 1) {
        return res.json({
            status: 0,
            message: "Not Authorized"
        });
    }

    const { regionId } = req.params;
    regionModel.findByIdAndDelete(regionId)
        .then(deletedRegion => {
            return res.json({
                status: true,
                message: "Region deleted successfully",
                data: deletedRegion
            });
        })
        .catch(error => {
            return res.json({
                status: false,
                message: "Something went wrong",
                data: error
            });
        });
};
