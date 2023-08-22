const carousel = require("../models/carousel")

const createFirstCarousel= async function(req,res){
    const {description}=req.body
    const images= req.files.map((file)=>file.location)
    const created= await carousel.create({description,images})
    res.status(201).json(created)
}

const getSecondCarousel=async(req,res)=>{
    const getData= await carousel.find()
    res.json(getData)
}


module.exports={createFirstCarousel,getSecondCarousel}