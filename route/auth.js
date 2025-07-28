const route=require('express').Router()
const User=require('../models/user')
const bcryptjs=require('bcryptjs')
//For Register
route.post('/register',async(req,res)=>{
    try{
        const {email,name,password}=req.body;
        const hashpass=bcryptjs.hashSync(password)
        const user=new User({
            email:email,
        name:name,
    password:hashpass
})
user.save().then(()=>{
    console.log("Data is saved")
    console.log(hashpass)
    res.send("Data is saved")
})
    }
    catch(err){
        console.log("Data is not save")
    }
})
//Login 
route.post('/login',async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
        if(!user){
            res.status(400).json({message:"Please Signin First"})
            console.log("User Not Found")
        }
        const isPass=bcryptjs.compareSync(req.body.password,user.password)
        if(!isPass){
             res.status(400).json({message:"Inncoorect Password"})
            console.log("Wrong Password")
        }
        const {password,...other}=user._doc;
         res.status(200).json({other})
            console.log({other})
    }
    catch(err){
        console.log("Data is not save")
         res.status(400).json({message:"Error"})
    }
})
module.exports=route