const Shipment = require("../model/Shipmentsmodel");
const Driver = require("../../driver/model/drivermodel"); // لازم تعمل import للـ Driver model
const asyncWrapper = require("../../../middlewares/errormiddl")
exports.createShipment = async (req, res) => {
  try {
    const shipment = await Shipment.create(req.body);
    res.status(201).json(shipment);
  } catch (error) {
    console.error("Create shipment error:", error);
    res.status(500).json({ message: error.message });
  }
};


exports.getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) return res.status(404).json({ message: "Shipment not found" });
    res.json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("driver", "name phone isAvailable");

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.partialUpdateShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//assign
exports.assignShipment = asyncWrapper(async (req, res, next) => {
  const { id, driverId } = req.params;

  const shipment = await Shipment.findById(id);
  if (!shipment) {
    return next(AppError.create("Shipment not found", 404));
  }

  if (shipment.driver) {
    return next(AppError.create("Shipment already assigned", 400));
  }

  const driver = await Driver.findById(driverId);
  if (!driver) {
    return next(AppError.create("Driver not found", 404));
  }

  if (!driver.isAvailable) {
    return next(AppError.create("Driver not available", 400));
  }

  shipment.driver = driverId;
  shipment.status = "assigned";
  driver.isAvailable = false;

  await shipment.save();
  await driver.save();

  res.status(200).json({
    status: "success",
    message: "Shipment assigned successfully",
    data: { shipment }
  });
});
exports.getShipmentsByDriver = async (req, res) => {
  try {
    const shipments = await Shipment.find({ driver: req.params.driverId }).populate("driver", "name phone isAvailable");
    res.json({ status: "success", data: shipments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
