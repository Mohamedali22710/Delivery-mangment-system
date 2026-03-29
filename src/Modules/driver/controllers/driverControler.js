
const driverdb = require("../../../data/driver.json");
const driverModel = require("../model/drivermodel");
const httpStat = require("../../../utils/httpStatustext");
const drivermodel = require("../model/drivermodel");
const asyncWrapper = require("../../../middlewares/errormiddl")

const appError=require("../../../utils/AppError");
//!get all driver

getDriverAll = async (req, res) => {
    // fs.readFile(driverdb  ,"utf-8",(err,   data)=>{
    //     if(err){
    //           return res.status(400).json({ err: "invalid request" });
    //     }
    // })
    const drivers = await driverModel.find({}, { "__V": false },{"password":false}).populate("user", "name email");;
    // res.send(drivers);
    // used jsed

    res.json({ status: httpStat.success, data: { drivers } })
};

//!add
// addDriver = asyncWrapper( async (req, res,next) => {


//     // const draiverreq = { ...req.body };
//     //creat in body in postman req and save it in db 
//     const newDriver = await driverModel.create(req.body);
//     if (!req.body) {
//         const Error= appError.create(null,400,httpStat.fail);
//         return next(Error);
//     }
//     // driverdb.push(draiverreq);
//     await newDriver.save();
//     res.status(200).json({ status: httpStat.success, data: { newDriver } });

// })
//!add=>DEISHA
addDriver = async (req, res) => {
    const io = req.app.get("io"); // socket

    const newDriver = new driverModel(req.body);
    if (!req.body) {
        return res.status(400).json({ status: httpStat.fail, data: null });
    }
    await newDriver.save();

    //  Socket emit لكل room الخاص بالـ driver الجديد
    io.to(newDriver._id.toString()).emit("driverUpdated", {
        driverId: newDriver._id,
        data: newDriver
    });

    res.status(200).json({ status: httpStat.success, data: { newDriver } });
}

getDriverId = asyncWrapper(async (req, res, next) => {



    const driverId = req.params.driverID;
    // const driveres = driverdb.find((driver) => driver.id === driverId);
    const drivers = await driverModel.findById(driverId);


    if (!drivers) {
        const error = appError.create("driver not found",500,httpStat.error);
        return next(error);
    }

    res.status(200).json({ status: httpStat.success, data: { driver: drivers } })



})

//!update
updataInfo = asyncWrapper( (req, res) => {
    const driverId = req.params.driverID;


        // const driverUpdate = drivermodel.updateOne({ id: driverId }, { $set: { ...req.body } });
        const driverUpdate=driverModel.findByIdAndUpdate(driverId,req.body,{new:true});
        res.status(200).json({ status: httpStat.success, data: { driver: driverUpdate } });
})

//!delete
deleteDriverInfo = asyncWrapper( (req, res, next) => {
    const driverId = +req.params.driverID;
    const driveres = driverModel.findByIdAndDelete(driverId);
    // if (!driveres) {
    //     res.status(400).json({ err: "Invalid req" });
    //     next();
    // }

    res.status(200).json(driveres);

})

module.exports = {
    getDriverAll,
    addDriver,
    getDriverId,
    updataInfo,
    deleteDriverInfo


}