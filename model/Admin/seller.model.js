const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    }
},
    {
        timestamps: true
    })


var sellerModel = mongoose.model('sellers', sellerSchema);
module.exports = sellerModel;