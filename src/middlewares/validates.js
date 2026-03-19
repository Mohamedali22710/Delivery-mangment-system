// const {body}=require("joi");
const joi=require("joi")
// const validateSchema=()=>{
//     return[
//         body("name").notEmpty()
//     ]
    
// }

module.exports=function(schema)
{
  return  (req,res,next)=>{
        const {error}=schema.validate(req.body);
        if(error){
            
            return res.status(400).json({error: error.details[0].message })
        }
        next();
}}

