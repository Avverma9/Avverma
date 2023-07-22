const mongoose = require("mongoose")

const offerReviewSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref:"user",
        required : true
    },
    offers:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"offers",
        required:true
    },
    comment :{
        type:String,
        required:true
    },  
    createdAt: {
        type: Date,
        default: Date.now
      }

})

module.exports= mongoose.model("offerReview",offerReviewSchema)