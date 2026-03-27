const express = require("express");
const router = express.Router();
const AuthController=require("../controller/authController");
const validate = require("../../../middlewares/validates");
const {registerSchema} = require("../Validator/authValidator");
const { loginSchema } = require("../Validator/authValidator");
const verifyToken = require("../../../middlewares/Authmiddlewares");
//!do not forget upload lib multer to upload image from form => npm i  --save multer
const multer=require("multer");
const AppError = require("../../../utils/AppError");

//!func to storage uplod file or image

// const diskStorage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         console.log(`file : ${file}`);
//         cb(null,"Uploads")
//     },
//     filename:function(req,file,cb){
//         const ext=file.mimetype.split("/")[1];
//         const filename=`user-${Date.now()}.${ext}`;
//         cb(null,filename);
//     }
// })

// const filefilter=function(req,file,cb){
//     const imgType=file.mimetype.split("/")[0];
//     if(imgType==="image"){
//         return cb(null,true);
//     }else{
//       return cb(AppError.create("file must image",400),false);;  
//     }
// }
// const upload=multer({storage:diskStorage})
router.route("/register").post(validate(registerSchema), AuthController.Register);
router.route("/login").post(validate(loginSchema),AuthController.login);
router.route("/logout").post(AuthController.logout);
router.route("/Profile").get(verifyToken,AuthController.GETProfile);
module.exports=router;


