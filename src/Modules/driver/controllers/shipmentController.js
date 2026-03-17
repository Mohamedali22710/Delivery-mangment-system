const Shipment = require("../model/shipment");

// Create Shipment
exports.createShipment = async (req, res) => {
  try {
    const shipment = await Shipment.create(req.body);
    res.status(201).json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all shipments
exports.getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get shipment by ID
exports.getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) return res.status(404).json({ message: "Shipment not found" });
    res.json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};