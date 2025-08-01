const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    list:[
        {
            type:mongoose.Types.ObjectId,
            ref:"List"
        }
    ]
},{timestamps:true});
module.exports=mongoose.model("User",userSchema)