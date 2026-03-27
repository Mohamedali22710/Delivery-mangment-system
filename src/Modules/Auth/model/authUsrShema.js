const mongoose = require("mongoose");
const userRole = require("../../../utils/UserRole");
const { string } = require("joi");
const userSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },

    password:{
        type:String,
        select:false
       
    },

    phone:{
        type:String
    },

    role:{
        type:String,
        enum:[userRole.Admin,userRole.driver],
        default:userRole.driver
    },
    token:{
        type:String
    },
    avatar:{
        type:String,
        

    }
},{
    timestamps:true
})

module.exports = mongoose.model("User",userSchema)