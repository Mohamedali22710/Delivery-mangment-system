const AppError = require("../utils/AppError")
const httpStat = require("../utils/httpStatustext");
module.exports=(...role)=>{
    
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
            const error=AppError.create("this role is not auth",401,httpStat.error);
           return next(error);
        }
        next();
    }
}