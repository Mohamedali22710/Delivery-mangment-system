const Shipment = require('../model/Shipmentsmodel');
const httpStat = require('../../../utils/httpStatustext');

exports.createShipment = async (req, res) => {
    const io = req.app.get('io');
    try {
        if (!req.body) return res.status(400).json({ status: httpStat.fail, data: null });

        const newShipment = new Shipment(req.body);
        await newShipment.save();

        io.to(newShipment._id.toString()).emit('shipmentUpdated', {
            shipmentId: newShipment._id,
            data: newShipment
        });

        res.status(201).json({ status: httpStat.success, data: newShipment });
    } catch (err) {
        res.status(500).json({ status: httpStat.error, message: err.message });
    }
};

exports.getAllShipments = async (req, res) => {
    try {
        const shipments = await Shipment.find({}, { __v: 0 });
        res.status(200).json({ status: httpStat.success, data: shipments });
    } catch (err) {
        res.status(500).json({ status: httpStat.error, message: err.message });
    }
};

exports.getShipmentById = async (req, res) => {
    try {
        const shipment = await Shipment.findById(req.params.id);
        if (!shipment) return res.status(404).json({ status: httpStat.fail, data: null });
        res.status(200).json({ status: httpStat.success, data: shipment });
    } catch (err) {
        res.status(400).json({ status: httpStat.error, message: err.message });
    }
};

exports.updateShipment = async (req, res) => {
    const io = req.app.get('io');
    try {
        const shipment = await Shipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!shipment) return res.status(404).json({ status: httpStat.fail, data: null });

        io.to(shipment._id.toString()).emit('shipmentUpdated', { shipmentId: shipment._id, updates: req.body });

        res.status(200).json({ status: httpStat.success, data: shipment });
    } catch (err) {
        res.status(400).json({ status: httpStat.error, message: err.message });
    }
};

exports.partialUpdateShipment = async (req, res) => {
    const io = req.app.get('io');
    try {
        const shipment = await Shipment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!shipment) return res.status(404).json({ status: httpStat.fail, data: null });

        io.to(shipment._id.toString()).emit('shipmentUpdated', { shipmentId: shipment._id, updates: req.body });

        res.status(200).json({ status: httpStat.success, data: shipment });
    } catch (err) {
        res.status(400).json({ status: httpStat.error, message: err.message });
    }
};

exports.assignShipment = async (req, res) => {
    const io = req.app.get('io');
    const { id, driverId } = req.params;

    try {
        const shipment = await Shipment.findByIdAndUpdate(id, { driver: driverId, status: "assigned" }, { new: true });
        if (!shipment) return res.status(404).json({ status: httpStat.fail, data: null });

        io.to(shipment._id.toString()).emit('shipmentUpdated', {
            shipmentId: shipment._id,
            updates: { driver: driverId, status: "assigned" }
        });

        res.status(200).json({ status: httpStat.success, data: shipment });
    } catch (err) {
        res.status(400).json({ status: httpStat.error, message: err.message });
    }
};