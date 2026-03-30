import React, { useEffect, useState } from 'react';
import { getShipments, assignShipment, updateShipmentStatus } from './api';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); // عدّل حسب السيرفر

const statuses = ['pending', 'assigned', 'picked_up', 'in_transit', 'delivered'];

const Dashboard = () => {
  const [shipments, setShipments] = useState([]);
  const [drivers, setDrivers] = useState([
    { id: '1', name: 'Ahmed' },
    { id: '2', name: 'Ali' },
  ]); // ممكن تجيبهم من API Drivers

  const fetchShipments = async () => {
    const res = await getShipments();
    setShipments(res.data.data);
  };

  useEffect(() => {
    fetchShipments();

    // Realtime updates
    socket.on('shipmentUpdated', (data) => {
      setShipments((prev) =>
        prev.map((s) => (s._id === data.shipmentId ? { ...s, ...data.data, ...data.updates } : s))
      );
    });

    return () => socket.off('shipmentUpdated');
  }, []);

  const handleAssign = async (shipmentId, driverId) => {
    await assignShipment(shipmentId, driverId);
  };

  const handleStatusUpdate = async (shipmentId, status) => {
    await updateShipmentStatus(shipmentId, status);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Shipment Dashboard</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Status</th>
            <th>Driver</th>
            <th>Assign Driver</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((s) => (
            <tr key={s._id}>
              <td>{s._id}</td>
              <td>{s.sender}</td>
              <td>{s.receiver}</td>
              <td>{s.status}</td>
              <td>{s.driver || '-'}</td>
              <td>
                {s.status === 'pending' && (
                  <select onChange={(e) => handleAssign(s._id, e.target.value)} defaultValue="">
                    <option value="" disabled>
                      Select Driver
                    </option>
                    {drivers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                )}
              </td>
              <td>
                {s.status !== 'delivered' && (
                  <select onChange={(e) => handleStatusUpdate(s._id, e.target.value)} defaultValue="">
                    <option value="" disabled>
                      Update Status
                    </option>
                    {statuses
                      .filter((st) => st !== s.status)
                      .map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;