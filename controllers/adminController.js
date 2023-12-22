const admin = require("../models/adminModel")
const register = async(req,res)=>{
    const {email,password}=req.body
    const images = req.files.map((file)=>file.location)
    const createAuser= await admin.create({images,email,password})
    res.json(createAuser)
}
const signIn= async function(req,res){
    const {email,password} = req.body
    const findData = await admin.findOne({email:email,password:password})
    res.json(findData)
}

module.exports={register,signIn}