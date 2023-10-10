const Dashboard= require("../models/dashBoardUserModel")

// Register ===========================
const registerUser=async (req,res)=>{
    const {name,email,mobile,password}=req.body
    const emailExist = await Dashboard.findOne({email:email})
    const mobileExist = await Dashboard.findOne({mobile:mobile})
    if(emailExist){
        return res.status(400).json({message:"Email already existed"})
    }
    if(mobileExist){
        return res.status(400).json({message : "Mobile already existed"})
    }
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
//update 
const updatePartner = async function (req, res) {
    const { id } = req.params;
    const { name, email, mobile, password } = req.body;

  
    const alreadyRegistered = await Dashboard.findOne({ email: email });
    const mobileExist = await Dashboard.findOne({ mobile: mobile });
    if (alreadyRegistered) {
        return res.status(400).json({ message: "Email already registered" });
    }
    if(mobileExist) {
return res.status(400).json({message: "Mobile number is already existed"})
    }

    
    try {
        const partnerUpdated = await Dashboard.findByIdAndUpdate(
            id,
            { name, email, mobile, password },
            { new: true }
        );

        if (!partnerUpdated) {
            return res.status(404).json({ message: "Partner not found" });
        }

        res.status(200).json({ message: "User successfully updated" });
    } catch (error) {
        console.error("Error updating partner:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports={registerUser,loginUser,getPartners,deletePartner,updatePartner}