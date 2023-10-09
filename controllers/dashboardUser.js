const Dashboard= require("../models/dashBoardUserModel")

// Register ===========================
const registerUser=async (req,res)=>{
    const {name,email,mobile,password}=req.body
    const images= req.files.map((file)=>file.location)
    const created= await Dashboard.create({images,name,email,mobile,password})
    res.status(201).json({message:"Registration Done",created})
}
//Login ========================

const loginUser = async function(req,res){
 const {email,password}=req.body
 const loggedUser= await Dashboard.findOne({email:email,password:password})
 if(!loggedUser){
    res.status(400).json({message: "login failed"})
 }else {
     res.status(200).json({message:"Logged in as",loggedUserImage: loggedUser.images, loggedUserId: loggedUser._id, loggedUserName: loggedUser.name, loggedUserEmail: loggedUser.email})
 }
}
//get all users 
const getPartners = async function(req,res){
    const fetchUser = await Dashboard.find()
    res.json(fetchUser)
}
//delete 

const deletePartner = async function(req,res){
    const{id}=req.params
    const deleted= await Dashboard.findByIdAndDelete(id)
    res.status(200).json({ message:"this user is successfully deleted"})
}
module.exports={registerUser,loginUser,getPartners,deletePartner}