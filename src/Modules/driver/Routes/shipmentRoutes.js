const express = require("express");
const router = express.Router();
const { createShipmentValidator } = require("../validators/shipmentValidator");
const validate = require("../middlewares/validate");

const shipmentController = require("../controllers/shipmentController");

router.post("/shipments", createShipmentValidator, validate, shipmentController.createShipment);

router.get("/shipments", shipmentController.getAllShipments);

router.get("/shipments/:id", shipmentController.getShipmentById);

router.put("/shipments/:id",createShipmentValidator,validate,shipmentController.updateShipment);


router.patch("/shipments/:id",createShipmentValidator, validate,shipmentController.partialUpdateShipment);

module.exports = router;