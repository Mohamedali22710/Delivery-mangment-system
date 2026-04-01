// services/shipmentService.js

import api from "./api";

// Get all shipments (admin)
export const getAllShipments = async () => {
  const res = await api.get("/shipment/shipments");
  return res.data;
};

// Create shipment
export const createShipment = async (data) => {
  const res = await api.post("/shipment/shipments", data);
  return res.data;
};

// Assign shipment to driver
export const assignShipment = async (shipmentId, driverId) => {
  const res = await api.put(
    `/shipment/shipments/${shipmentId}/assign/${driverId}`
  );
  return res.data;
};

// Update shipment status
export const updateShipmentStatus = async (shipmentId, status) => {
  const res = await api.patch(`/shipment/shipments/${shipmentId}`, { status });
  return res.data;
};

// Get single shipment (tracking)
export const getShipmentById = async (id) => {
  const res = await api.get(`/shipment/shipments/${id}`);
  return res.data;
};