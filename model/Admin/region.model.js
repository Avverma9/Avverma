const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const regionModel = mongoose.model('regions', regionSchema);

module.exports = regionModel;
