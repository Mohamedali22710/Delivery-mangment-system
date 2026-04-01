import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  fetchShipments,
  addShipment,
  assignShipmentToDriver,
} from "../features/shipments/shipmentSlice";
import { fetchDrivers } from "../features/drivers/driverSlice";

export default function ShipmentsDashboard() {
  const dispatch = useDispatch();

  const { shipments, loading } = useSelector((state) => state.shipments);
  const { drivers } = useSelector((state) => state.drivers);

  const { register, handleSubmit, reset } = useForm();

 
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    assigned: "bg-blue-100 text-blue-700",
    picked_up: "bg-purple-100 text-purple-700",
    in_transit: "bg-indigo-100 text-indigo-700",
    delivered: "bg-green-100 text-green-700",
  };

  useEffect(() => {
    dispatch(fetchShipments());
    dispatch(fetchDrivers());
  }, [dispatch]);

  const onCreateShipment = (data) => {
    dispatch(addShipment(data));
    reset();
  };

  const handleAssign = (shipmentId, driverId) => {
    if (!driverId) return;

    dispatch(
      assignShipmentToDriver({
        shipmentId,
        driverId,
      })
    );
  };

  if (loading)
    return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <h1 className="text-3xl font-black text-slate-900">
          Shipments Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Create Shipment */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-bold mb-4">Create Shipment</h2>

            <form
              onSubmit={handleSubmit(onCreateShipment)}
              className="space-y-4"
            >
              <input
                {...register("sender", { required: true })}
                placeholder="Sender"
                className="w-full p-2 border rounded"
              />

              <input
                {...register("receiver", { required: true })}
                placeholder="Receiver"
                className="w-full p-2 border rounded"
              />

              <input
                {...register("pickupAddress", { required: true })}
                placeholder="Pickup Address"
                className="w-full p-2 border rounded"
              />

              <input
                {...register("deliveryAddress", { required: true })}
                placeholder="Delivery Address"
                className="w-full p-2 border rounded"
              />

              <button className="w-full bg-blue-600 text-white py-2 rounded">
                Create
              </button>
            </form>
          </div>

          {/* Shipments Table */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-bold mb-4">All Shipments</h2>

            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Route</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Driver</th>
                  <th className="p-3">Assign</th>
                </tr>
              </thead>

              <tbody>
                {shipments.map((ship) => (
                  <tr key={ship._id} className="border-b">

                    <td className="p-3 text-xs">{ship._id}</td>

                    <td className="p-3">
                      {ship.pickupAddress} → {ship.deliveryAddress}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          statusStyles[ship.status] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {ship.status?.replace("_", " ")}
                      </span>
                    </td>

                    <td className="p-3">
                      {ship.driver
                        ? typeof ship.driver === "object"
                          ? ship.driver.name
                          : ship.driver
                        : "Unassigned"}
                    </td>

                    <td className="p-3">
                      {ship.status === "pending" ? (
                        <select
                          className="border p-2 rounded"
                          onChange={(e) =>
                            handleAssign(ship._id, e.target.value)
                          }
                          defaultValue=""
                        >
                          <option value="">Assign</option>

                          {drivers
                            .filter((d) => d.isAvailable)
                            .map((d) => (
                              <option key={d._id} value={d._id}>
                                {d.name}
                              </option>
                            ))}
                        </select>
                      ) : (
                        <span className="text-gray-400 text-xs">
                          Assigned
                        </span>
                      )}
                    </td>
                  </tr>
                ))}

                {shipments.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center p-4">
                      No shipments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}