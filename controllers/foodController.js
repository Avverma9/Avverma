const foodModel = require("../models/foodModel")

const createFood= async (req,res)=>{
    const {name,description,price}=req.body
    const images = req.files.map(file=>file.location)
    const created= await foodModel.create({name,images,description,price})
    res.json(created)
}

const getFood= async(req,res)=>{
    const getData= await foodModel.find()
    res.json(getData)

}

module.exports={createFood,getFood}