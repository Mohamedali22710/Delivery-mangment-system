const express = require("express");
const router = express.Router();

const shipmentController = require("../controller/ShipmentsControllers");
const validate = require("../../../middlewares/validates");
const verifyToken = require("../../../middlewares/Authmiddlewares");
const allowedto = require("../../../middlewares/allowedto");
const userRole = require("../../../utils/UserRole");
const shipmentSchema = require("../validator/Shipmentsvalidator");


router.post(
  "/",
  verifyToken,
  allowedto(userRole.Admin),
  
  shipmentController.createShipment
);


router.get("/", shipmentController.getAllShipments);




router.put(
  "/:id",
  verifyToken,
  allowedto(userRole.Admin),
  validate(shipmentSchema),
  shipmentController.updateShipment
);

router.get(
  "/:id",
  verifyToken,
  allowedto(userRole.Admin, userRole.driver),
  shipmentController.getShipmentById
);


router.patch(
  "/:id",
  verifyToken,
  allowedto(userRole.Admin, userRole.driver),
  shipmentController.partialUpdateShipment
);


router.put(
  "/:id/assign/:driverId",
  verifyToken,
  allowedto(userRole.Admin),
  shipmentController.assignShipment
);


router.get(
  "/driver/:driverId",
  verifyToken,
  allowedto(userRole.driver),
  shipmentController.getShipmentsByDriver
);

module.exports = router;