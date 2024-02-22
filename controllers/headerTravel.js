const HeaderLocation= require("../models/headerTravelModel")
exports.CreateLocation= async (req,res)=>{
    try {
          const {location} = req.body
    const images = req.files.map((file)=>file.location)
    const created= await HeaderLocation.create({location,images})
    res.status(201).json({message:"One more location added", created})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error:"Internal server error"})
    }
  
}
exports.getLocation= async (req,res)=>{
    try {
   
    const getData= await HeaderLocation.find()
    res.status(200).json(getData)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error:"Internal server error"})
    }
  
}
