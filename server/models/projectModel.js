const mongoose = require("mongoose")


const projectSchema = new mongoose.Schema({
    clientName:{type:String},
    mobile:{type:Number},
    startDate:{type:Date},
    endDate:{type:Date},
    frontDeveloper1:{type:String},
    frontDeveloper2:{type:String},
    frontDeveloper3:{type:String},
    frontDeveloper4:{type:String},
    frontDeveloper5:{type:String},
    backendDeveloper1:{type:String},
    backendDeveloper2:{type:String},
    backendDeveloper3:{type:String},
    backendDeveloper4:{type:String},
    backendDeveloper5:{type:String},
    completionStatus:{type:String},
    remarks:{type:String},
    budget:{type:String}
})

module.exports=mongoose.model("project",projectSchema)