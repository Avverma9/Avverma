const admin = require("../models/adminModel")
const register = async(req,res)=>{
    const {name,email,password}=req.body
    const images = req.files.map((file)=>file.location)
    const createAuser= await admin.create({images,name,email,password})
    res.json(createAuser)
}
const signIn= async function(req,res){
    const {email,password} = req.body
    const findData = await admin.findOne({email:email,password:password})

    if (!findData) {
        res.status(400).json({ message: "Login failed" });
      } else {
        res.status(200).json({
          message: "Logged in as",
          loggedUserImage: findData.images,
          loggedUserId: findData._id,
          loggedUserName: findData.name,
          loggedUserEmail: findData.email,
        });
      }
}

module.exports={register,signIn}