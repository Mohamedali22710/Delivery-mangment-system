
const driverdb = require("../../../data/driver.json");
const driverModel = require("../model/drivermodel");
const httpStat = require("../../../utils/httpStatustext");
const drivermodel = require("../model/drivermodel");
//!get all driver

getDriverAll = async (req, res) => {
    // fs.readFile(driverdb  ,"utf-8",(err,   data)=>{
    //     if(err){
    //           return res.status(400).json({ err: "invalid request" });
    //     }
    //     res.send(data);
    // })
    const drivers = await driverModel.find({},{"__V":false});
    // res.send(drivers);
    // used jsed

    res.json({ status: httpStat.success, data: { drivers } })
};

//!add
addDriver = async (req, res) => {


    // const draiverreq = { ...req.body };
    //creat in body in postman req and save it in db 
    const newDriver = new driverModel(req.body);
    if (!req.body) {
        return res.status(400).json({ status: httpStat.fail, data: null });
    }
    // driverdb.push(draiverreq);
    await newDriver.save();
    res.status(200).json({ status: httpStat.success, data: { newDriver } });

}

getDriverId = async (req, res) => {


    try {
        const driverId = req.params.driverID;
        // const driveres = driverdb.find((driver) => driver.id === driverId);
        const drivers = await driverModel.findById(driverId);

        res.status(200).json({ status: httpStat.success, data: { driver: drivers } })
        if (!drivers) {
            res.status(404).json({ status: httpStat.fail, data: { drivers: null } });
        }
    } catch (err) {
        res.status(400).json({ status: httpStat.error, data: null, massage: err.massage, code: 400 });
    }




}

//!update
updataInfo = (req, res) => {
    const driverId = req.params.driverID;


    // const driveres = driverdb.find((driver) => driver.id === driverId);
    // if (!driveres) {
    //     res.status(400).json({ err: "Invalid req" });
    // }



    // const newInfoDriver = { ...driveres, ...req.body }
    try {
        const driverUpdate = drivermodel.updateOne({ id: driverId }, { $set: { ...req.body } });
        res.status(200).json({ status: httpStat.success, data: { driver: driverUpdate } });
    } catch (err) {
        res.status(400).json({ status: httpStat.error, error: err.massage })
    }

}

//!delete
deleteDriverInfo = (req, res, next) => {
    const driverId = +req.params.driverID;
    const driveres = driverdb.filter((driver) => driver.id !== driverId);
    if (!driveres) {
        res.status(400).json({ err: "Invalid req" });
        next();
    }

    res.status(200).json(driveres);

}

module.exports = {
    getDriverAll,
    addDriver,
    getDriverId,
    updataInfo,
    deleteDriverInfo


}