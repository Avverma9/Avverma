const categoryModel = require('../../model/Admin/category.model');

exports.addCategory = async (req, res) => {
    try {
        const loggedInUser = req.decoded
        if (!loggedInUser || loggedInUser.role != 1) {
            return res.json({
                status: 0,
                message: "Not Authorized",
            })
        }

        const { name , region , startTime , endTime } = req.body;
        if (!name) {
            return res.json({
                status: false,
                message: "Name is a required field"
            });
        }
        if (!region) {
            return res.json({
                status: false,
                message: "region is a required field"
            });
        }
        if (!startTime) {
            return res.json({
                status: false,
                message: "startTime is a required field"
            });
        }
        if (!endTime) {
            return res.json({
                status: false,
                message: "endTime is a required field"
            });
        }

        const newCategory = new categoryModel({ name , region , startTime , endTime });
        const savedCategory = await newCategory.save();

        return res.json({
            status: true,
            message: "Category created successfully",
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
    await categoryModel.find()
        .then(success => {
            const nameCountMap = {};

            for (const category of success) {
                const name = category.name;
                if (name in nameCountMap) {
                    nameCountMap[name]++;
                } else {
                    nameCountMap[name] = 1;
                }
            }
            
        

            return res.json({
                status: true,
                message: "categories",
                data: success,
             nameCountMap :nameCountMap
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
  
    const { catId } = req.params

    await categoryModel.findById({ _id: catId })
        .then(success => {
            return res.json({
                status: true,
                message: "category",
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

    const { catId } = req.params

    await categoryModel.findByIdAndDelete({ _id: catId })
        .then(success => {
            return res.json({
                status: true,
                message: "category deleted",
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

exports.updateCategory = async (req, res) => {
    const loggedInUser = req.decoded
    if (!loggedInUser || loggedInUser.role != 1) {
        return res.json({
            status: 0,
            message: "Not Authorized",
        })
    }

    const update_data = req.body
    const { catId } = req.params

    await categoryModel.findByIdAndUpdate(
        catId,
        { $set: update_data },
        { new: true }
    )
        .then(success => {
            return res.json({
                status: true,
                message: "category updated",
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