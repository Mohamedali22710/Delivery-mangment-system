const userModel = require("../model/authUsrShema");
const Driver = require("../../driver/model/drivermodel")
const asyncWrapper = require("../../../middlewares/errormiddl");
const AppError = require("../../../utils/AppError");
const httpStat = require("../../../utils/httpStatustext");
const bcrypt = require("bcrypt");

const generateToken = require("../../../utils/generateToken");

const Register = asyncWrapper(async (req, res, next) => {

    const { name, email, password, phone, vehicleType, licenseNumber, role } = req.body;

    const olduser = await userModel.findOne({ email: email })
    if (olduser) {
        const error = AppError.create("email is ealready  excite", 400, httpStat.fail);
        return next(error);
    }

    if (!name || !email || !password) {
        const error = AppError.create("name and email and password req", 400, httpStat.fail);
        return next(error);
    }
    const hashedPassword = await bcrypt.hash(password, 10);



    const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
        role,
    });


    const token = await generateToken({ email: newUser.email, id: newUser._id, role: newUser.role })



    newUser.token = token;
    await newUser.save();

    if (phone && vehicleType && licenseNumber) {
        try {
            await Driver.create({
                user: newUser._id,
                phone,
                vehicleType,
                licenseNumber
            });
        } catch (err) {
            console.log("Driver creation error:", err);
            return next(AppError.create("Driver creation failed", 400, httpStat.fail));
        }

    }



    res.status(201).json({ status: httpStat.success, data: newUser });
})

const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = AppError.create("email and password req", 400, httpStat.fail);
        return next(error);
    }

    const user = await userModel.findOne({ email: email });

    if (!user) {
        const error = AppError.create("user not found", 400, httpStat.fail);
        return next(error);
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (! matchPassword) {
const error = AppError.create("not match ", 400, httpStat.error);
        return next(error);
      
    } 
  const token = await generateToken({ email: user.email, id: user._id, role: user.role })

        res.status(201).json({ status: httpStat.success, data: token })
})

const logout = asyncWrapper(
    async (req, res) => {
        try {
            
            await userModel.findByIdAndUpdate(req.user._id, { status: "offline", });
            return res.status(200).json({ msg: "You loged out" });




        } catch (error) { console.log("Error in AuthController"); return res.status(500).json({ msg: error.message }); }
    }

)

const GETProfile=asyncWrapper(async(req,res,next)=>{
    res.status(200).json({
        status: "success",
        data: {
            user: req.user
        }
    });
})
module.exports = {
    Register,
    login,
    logout,
    GETProfile
}