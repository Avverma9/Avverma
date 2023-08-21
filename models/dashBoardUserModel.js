const mongoose = require("mongoose")

const dashboardUser = new mongoose.Schema({
    images: [String],
    name : String,
    mobile: Number,
    email: String,
    password:String
},{timestamps:true})

module.exports=mongoose.model("dashBoardUser",dashboardUser)