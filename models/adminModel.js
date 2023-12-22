const mongoose = require("mongoose")
const adminSchema = new mongoose.Schema({
    images:[String],
    email:String,
    password:String
})
module.exports=mongoose.model("admin",adminSchema)