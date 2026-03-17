const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
 sender: String,
 receiver: String,
 pickupAddress: String,
 deliveryAddress: String,
 status: {
  type: String,
  default: "pending"
 }
});

module.exports = mongoose.model("shipment", shipmentSchema);