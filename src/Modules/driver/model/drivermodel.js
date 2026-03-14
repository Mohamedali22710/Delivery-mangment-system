const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        trim:true
    },

    phone:{
        type:String,
        required:true,
        match:/^[0-9]{11}$/
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },

    vehicleType:{
        type:String,
        required:true,
        enum:["bike","car","truck"]
    },

    isAvailable:{
        type:Boolean,
        default:true
    }

},
{
    timestamps:true
}
);

module.exports = mongoose.model("Driver",driverSchema);