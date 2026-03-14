const joi=require("joi");

exports.driverSchema=joi.object({
Name: joi.string().required(),
email:joi.string().email().required(),
phone:joi.string().required(),
vehicleType: joi.string().required(),
isAvailable: joi.boolean().required()
}
    

)