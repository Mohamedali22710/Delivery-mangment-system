const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
 sender: String,
 receiver: String,
 pickupAddress: String,
 deliveryAddress: String,
 
driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver"
},
status: {
    type: String,
    enum: ["pending", "assigned", "in-transit", "delivered"],
    default: "pending"
}
});

module.exports = mongoose.model("shipment", shipmentSchema);