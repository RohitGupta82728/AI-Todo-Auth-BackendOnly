const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {ErrorHandler} =  "../middlewares/error.js";
const sendCookie = require('../utils/features');


const getAllUsers = async(req,res)=>{
    // try {
    //     const allUsers = await User.find({});
    //     res.json({
    //         success:true,
    //         allUsers
    //     });
    // } catch (error) {
    //     res.send(error);
    // }
   
}

const getMyProfile = (req,res)=>{
//   const id = "myid";
//   const {token} = req.cookies;
//   if(!token){
//     return res.status(404).json({
//         success:false,
//         message:'Login First'
//     });
//   }
//   const decoded = jwt.verify(token,process.env.JWT_SECRET);
//   const user = await User.findById(decoded._id);
  
  res.status(200).json({
    success:true,
    user:req.user
  })
}

const registerUser = async(req,res,next)=>{
    try {
        const{name,email,password}=req.body;
        let user = await User.findOne({email});
       

        if (user) return next(new ErrorHandler("User already exists", 400));

       

        const hashedPassword = await bcrypt.hash(password,10);

        user = await User.create({
            name,
            email,
            password:hashedPassword
        });
        
        sendCookie(user,res,"Registered Successfully",201);
       
    } catch (error) {
        next(error);
    }
}

const login= async(req,res,next)=>{
    try {
        const{email,password}=req.body;
    let user = await User.findOne({email}).select("+password");

    if (!user) return next(new ErrorHandler("Invalid email or password", 400));


    const isMatch = await bcrypt.compare(password,user.password);

    if (!isMatch) return next(new ErrorHandler("Invalid email or password", 400));


    sendCookie(user,res,`Welcome Back ${user.name}`,200);
    } catch (error) {
        next(error);
    }
}


const logout =(req,res)=>{


    res.status(200).cookie('token',"",{expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true})
        .json({
        success:true,
        user:req.user
    });
}

module.exports = {getAllUsers,getMyProfile,registerUser,login,logout};






























// const updateUser = async(req,res)=>{
//     try {
//         const {id} = req.params;
//         const user = await User.findById(id);

//         res.json({
//             success:true,
//             message:'Updated'
//         })
//     } catch (error) {
//         res.send(error);
//     }
// }

// const deleteUser = async(req,res)=>{
//     try {
//         const {id} = req.params;
//         const user = await User.findById(id);

//         await user.remove();

//         res.json({
//             success:true,
//             message:'Deleted'
//         })
//     } catch (error) {
//         res.send(error);
//     }
// }
