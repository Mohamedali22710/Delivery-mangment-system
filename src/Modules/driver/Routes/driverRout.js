const express = require("express");
const driverdb = require("../../../data/driver.json");
// const fs = require("fs");
const router = express.Router();
const driverControl = require("../controllers/driverControler")
const validate = require("../../../../src/middlewares/validates");
const { driverSchema } = require("../Validator/driverValidator");

//!adding driver


// console.log(driverdb)
router.post("/", validate(driverSchema), driverControl.addDriver)
//!getAllDriver
router.get("/", driverControl.getDriverAll)

//!getDriverByID
//!delete
//!update
router.route("/:driverID")
.get(driverControl.getDriverId)
    .patch(driverControl.updataInfo)
    .delete(driverControl.deleteDriverInfo)





module.exports = router;