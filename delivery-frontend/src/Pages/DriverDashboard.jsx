import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../services/api';

export default function DriverDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyShipments();
  }, [user]);

  const fetchMyShipments = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data } = await api.get('/shipments');
      // Ensure allShipments is always an array to prevent .filter() crash
      const rawData = data?.data || data;
      const allShipments = Array.isArray(rawData) ? rawData : [];
      
      // Filter by: shipment.driver === user._id
      const myShipments = allShipments.filter(shipment => {
        // Handle standard string ID or populated object ID
        const driverId = typeof shipment.driver === 'object' && shipment.driver !== null 
          ? shipment.driver._id 
          : shipment.driver;
        return driverId === user._id;
      });
      setShipments(myShipments);
    } catch (error) {
      console.error('Error fetching driver shipments:', error);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (shipmentId, newStatus) => {
    try {
      // Backend uses PUT or PATCH
      await api.patch(`/shipments/${shipmentId}`, { status: newStatus });
      fetchMyShipments();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex justify-between items-center pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Driver Dashboard</h1>
            <p className="text-slate-500 mt-1">View your assigned deliveries.</p>
          </div>
          <div className="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold shadow-md">
            Driver: {user?.name || 'Loading...'}
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Assigned Shipments</h2>
          
          <div className="space-y-4">
            {shipments.length === 0 ? (
              <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-500">
                You have no assigned shipments right now.
              </div>
            ) : (
              shipments.map(ship => (
                <div key={ship._id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border border-slate-100 rounded-xl hover:shadow-md transition bg-white">
                  
                  {/* Info */}
                  <div className="mb-4 md:mb-0">
                    <div className="font-mono text-xs text-slate-400 mb-1">ID: {ship._id}</div>
                    <div className="font-bold text-slate-800 text-lg">{ship.deliveryAddress || 'No Address'}</div>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                        From: {ship.sender || 'N/A'} ➔ To: {ship.receiver || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-col md:items-end gap-2 w-full md:w-auto">
                    <div className={`px-3 py-1 rounded-md text-sm font-bold w-fit ${ship.status === 'delivered' ? 'bg-green-100 text-green-700' : ship.status === 'in-transit' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {ship.status || 'pending'}
                    </div>

                    <div className="flex gap-2 mt-2">
                      {ship.status !== 'in-transit' && ship.status !== 'delivered' && (
                        <button 
                          onClick={() => handleStatusUpdate(ship._id, 'in-transit')}
                          className="px-4 py-2 text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 rounded-lg transition"
                        >
                          Mark Next: In Transit
                        </button>
                      )}
                      
                      {ship.status === 'in-transit' && (
                        <button 
                          onClick={() => handleStatusUpdate(ship._id, 'delivered')}
                          className="px-4 py-2 text-xs font-bold bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 rounded-lg transition"
                        >
                          Mark Next: Delivered
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
