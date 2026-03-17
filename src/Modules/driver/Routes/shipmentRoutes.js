const express = require("express");
const router = express.Router();
const { createShipmentValidator } = require("../Validator/shipmentValidator");
const validate = require("../middlewares/validate");

const shipmentController = require("../controllers/shipmentController");

router.post("/shipments", createShipmentValidator, validate, shipmentController.createShipment);
router.get("/shipments", shipmentController.getAllShipments);
router.get("/shipments/:id", shipmentController.getShipmentById);

module.exports = router;