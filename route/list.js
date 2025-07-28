const route=require("express").Router()
const List=require('../models/list')
const User=require('../models/user')
//Create 
route.post("/addList",async(req,res)=>{
try{
    const {title,body,email}=req.body
    const existuser=await User.findOne({email})
    if(existuser){
        const list=new List({
            title:title,
            body:body,
            user:existuser
        })
        await list.save().then(()=>res.status(200).json({list}))
        existuser.list.push(list)
        await existuser.save()
    }
}
catch(err){
    console.log(err)
    res.status(400).json({message:"Inncoorect Password"})
}
})
//update
route.put("/update/:id",async(req,res)=>{
try{
    const {title,body,email}=req.body
    const existuser=await User.findOne({email})
    if(existuser){
        const list=await List.findByIdAndUpdate(req.params.id,{title,body})
        await list.save().then(()=>res.status(200).json({list}))
    }
    }
catch(err){
    console.log(err)
    res.status(400).then(()=>res.status(200).json({message:"Error Occur"}))
}
})
//Delete
route.delete("/deleteTask/:id",async(req,res)=>{
try{
    const {email}=req.body
    const existuser=await User.findOneAndUpdate({email},{$pull:{list:req.params.id}})
    if(existuser){
        await List.findByIdAndDelete(req.params.id).then(()=>res.status(200).json({message:"Updated"}))
    }
    }
catch(err){
    console.log(err)
    res.status(400).json({message:"Error Occur"})
}
})
route.get("/getTask/:id",async(req,res)=>{
try{
   const list=await List.find({user:req.params.id}).sort({createdAt:-1})//sort({createdAt:1} arrange in sorted order
   if(list.length===0){
    console.log("List is Empty")
    res.status(400).json({message:"List is Empty"})
   }
   res.status(200).json({list:list})
    }
catch(err){
    console.log(err)
    res.status(400).json({message:"Error Occur"})
}
})
module.exports=route