const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    region: {
        type : String,
        default: ''
    } ,
    startTime: {
        type : String,
        default: ''
    } ,
    endTime: {
        type : String,
        default: ''
    } 
},
    {
        timestamps: true
    })


var categoryModel = mongoose.model('categories', categorySchema);
module.exports = categoryModel;