const express = require("express");
const router = express.Router();

const shipmentController = require("../controller/ShipmentsControllers");
const { createShipmentValidator } = require("../validator/Shipmentsvalidator");
const validate = require("../../../middlewares/validates");
const verifyToken = require("../../../middlewares/Authmiddlewares");
const allowedto = require("../../../middlewares/allowedto");
const userRole = require("../../../utils/UserRole");

router.post("/", verifyToken, allowedto(userRole.Admin), createShipmentValidator, validate, shipmentController.createShipment);
router.get("/", shipmentController.getAllShipments);
router.get("/:id", shipmentController.getShipmentById);
router.put("/:id", verifyToken, allowedto(userRole.Admin), createShipmentValidator, validate, shipmentController.updateShipment);
router.patch("/:id", verifyToken, allowedto(userRole.Admin), createShipmentValidator, validate, shipmentController.partialUpdateShipment);
router.put("/:id/assign/:driverId", verifyToken, allowedto(userRole.Admin), shipmentController.assignShipment);

module.exports = router;