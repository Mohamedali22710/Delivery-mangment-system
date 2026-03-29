const express = require("express");
const router = express.Router();
const { createShipmentValidator } = require("../validator/Shipmentsvalidator");


const shipmentController = require("../controller/ShipmentsControllers");
const validate = require("../../../middlewares/validates");
const verifyToken = require("../../../middlewares/Authmiddlewares");
const allowedto = require("../../../middlewares/allowedto");
const userRole = require("../../../utils/UserRole");

router.post("/shipments", verifyToken,allowedto(userRole.Admin), createShipmentValidator, validate, shipmentController.createShipment);

router.get("/shipments", shipmentController.getAllShipments);

router.get("/shipments/:id", shipmentController.getShipmentById);

router.put("/shipments/:id",verifyToken,allowedto(userRole.Admin),createShipmentValidator,validate,shipmentController.updateShipment);


router.patch("/shipments/:id",verifyToken,allowedto(userRole.Admin, userRole.driver),shipmentController.partialUpdateShipment);

router.put(
    "/shipments/:id/assign/:driverId",
    verifyToken,
    allowedto("admin"),
    shipmentController.assignShipment
);

module.exports = router;