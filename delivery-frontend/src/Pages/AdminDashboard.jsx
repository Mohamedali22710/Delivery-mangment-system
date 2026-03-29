import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import api from '../services/api';

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [shipments, setShipments] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { register: registerShipment, handleSubmit: handleShipmentSubmit, reset: resetShipment } = useForm();
  
  const [assignForm, setAssignForm] = useState({ shipmentId: '', driverId: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [shipmentsRes, driversRes] = await Promise.all([
        api.get('/shipments'),
        api.get('/driver')
      ]);
      const shipData = shipmentsRes.data?.data || shipmentsRes.data;
      const drivData = driversRes.data?.data || driversRes.data;

      setShipments(Array.isArray(shipData) ? shipData : []);
      setDrivers(Array.isArray(drivData) ? drivData : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const onCreateShipment = async (data) => {
    try {
      await api.post('/shipments', data);
      resetShipment();
      fetchData();
    } catch (error) {
      console.error('Error creating shipment:', error);
      alert('Failed to create shipment');
    }
  };

  const onAssignShipment = async (e) => {
    e.preventDefault();
    if (!assignForm.shipmentId || !assignForm.driverId) return;
    try {
      await api.put(`/shipments/${assignForm.shipmentId}/assign/${assignForm.driverId}`);
      setAssignForm({ shipmentId: '', driverId: '' });
      fetchData();
    } catch (error) {
      console.error('Error assigning shipment:', error);
      alert('Failed to assign shipment');
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex justify-between items-center pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage shipments and dispatch drivers.</p>
          </div>
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-md">
            Admin: {user?.name || 'Admin'}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Forms */}
          <div className="space-y-8">
            {/* Create Shipment Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Create Shipment</h2>
              <form onSubmit={handleShipmentSubmit(onCreateShipment)} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Sender</label>
                  <input {...registerShipment("sender", { required: true })} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Sender Name" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Receiver</label>
                  <input {...registerShipment("receiver", { required: true })} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Receiver Name" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Pickup Address</label>
                  <input {...registerShipment("pickupAddress", { required: true })} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Pickup Location" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Delivery Address</label>
                  <input {...registerShipment("deliveryAddress", { required: true })} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Delivery Destination" />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">
                  Create
                </button>
              </form>
            </div>

            {/* Assign Driver Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Assign Driver</h2>
              <form onSubmit={onAssignShipment} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Select Shipment</label>
                  <select 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    value={assignForm.shipmentId}
                    onChange={(e) => setAssignForm({ ...assignForm, shipmentId: e.target.value })}
                  >
                    <option value="">-- Choose Shipment --</option>
                    {shipments.filter(s => !s.driver).map(s => (
                      <option key={s._id} value={s._id}>{s._id} - {s.deliveryAddress}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Select Driver</label>
                  <select 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    value={assignForm.driverId}
                    onChange={(e) => setAssignForm({ ...assignForm, driverId: e.target.value })}
                  >
                    <option value="">-- Choose Driver --</option>
                    {drivers.map(d => (
                      <option key={d._id} value={d._id}>{d.name} ({d.vehicleType || 'Any driver'})</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-900 transition">
                  Assign Shipment
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Tables */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipments Table */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <h2 className="text-xl font-bold text-slate-800 mb-4">All Shipments</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 font-bold">
                    <tr>
                      <th className="p-3 rounded-tl-lg">ID</th>
                      <th className="p-3">Address</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 rounded-tr-lg">Driver</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments.map(ship => (
                      <tr key={ship._id} className="border-b border-slate-50 hover:bg-slate-50">
                        <td className="p-3 font-mono text-xs">{ship._id}</td>
                        <td className="p-3">
                          {ship.pickupAddress && ship.deliveryAddress 
                            ? `${ship.pickupAddress} ➔ ${ship.deliveryAddress}` 
                            : (ship.deliveryAddress || '-')}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-md text-xs font-bold ${ship.status === 'delivered' ? 'bg-green-100 text-green-700' : ship.status === 'in-transit' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {ship.status || 'pending'}
                          </span>
                        </td>
                        <td className="p-3">{ship.driver ? (typeof ship.driver === 'object' ? ship.driver.name : ship.driver) : 'Unassigned'}</td>
                      </tr>
                    ))}
                    {shipments.length === 0 && (
                      <tr>
                        <td colSpan="4" className="p-4 text-center">No shipments found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Drivers Table */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Drivers Status</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 font-bold">
                    <tr>
                      <th className="p-3 rounded-tl-lg">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Vehicle</th>
                      <th className="p-3 rounded-tr-lg">Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drivers.map(driver => (
                      <tr key={driver._id} className="border-b border-slate-50 hover:bg-slate-50">
                        <td className="p-3 font-semibold">{driver.name}</td>
                        <td className="p-3">{driver.email}</td>
                        <td className="p-3">{driver.vehicleType || '-'}</td>
                        <td className="p-3">
                          <span className="px-2 py-1 rounded-md text-xs font-bold bg-green-100 text-green-700">
                            Available
                          </span>
                        </td>
                      </tr>
                    ))}
                    {drivers.length === 0 && (
                      <tr>
                        <td colSpan="4" className="p-4 text-center">No drivers found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
