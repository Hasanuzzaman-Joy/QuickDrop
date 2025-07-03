import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaUserPlus } from "react-icons/fa";
import Loading from "../../../shared/Loading";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import useUserRole from "../../../../Hooks/useUserRole";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role } = useUserRole();

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [riders, setRiders] = useState([]);
  const [riderLoading, setRiderLoading] = useState(false);
  const [assigning, setAssigning] = useState(false);

  const {
    data: parcels = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["unassignedParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/unassigned");
      return res.data;
    },
  });

  const openAssignModal = async (parcel) => {
    setSelectedParcel(parcel);
    setRiderLoading(true);
    try {
      const res = await axiosSecure.get(
        `/riders/available?region=${parcel.senderRegion}`
      );
      setRiders(res.data);
    } catch (err) {
      console.error("Failed to fetch riders:", err);
      Swal.fire("Error", "Failed to fetch riders for this region", "error");
    } finally {
      setRiderLoading(false);
    }
  };

  const handleAssign = async (rider) => {
    if (assigning) return; // prevent double clicks
    setAssigning(true);

    try {
      const res = await axiosSecure.patch("/assign-rider", {
        parcelId: selectedParcel._id,
        riderId: rider._id,
        riderName: rider.name,
        riderEmail: rider.email,
      });

      if (res.data.modifiedCount > 0) {
        // Save tracking log
        await axiosSecure.post(`/tracking/${selectedParcel.tracking_id}`, {
          stage: "rider assigned",
          description: `Rider ${rider.name} assigned by ${user?.email}`,
          actorEmail: user?.email,
          actorRole: role,
        });

        Swal.fire("Success", "Rider assigned successfully!", "success");
        setSelectedParcel(null);
        refetch();
      } else {
        throw new Error("Assignment failed");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to assign rider", "error");
    } finally {
      setAssigning(false);
    }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center text-red-600">
        Failed to load unassigned parcels
      </p>
    );

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Assign Riders to Parcels</h2>

      <table className="table w-full">
        <thead>
          <tr className="bg-base-200 text-left">
            <th>#</th>
            <th>Tracking ID</th>
            <th>Sender</th>
            <th>From → To</th>
            <th>Cost</th>
            <th>Payment</th>
            <th>Delivery</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id} className="hover">
              <td>{index + 1}</td>
              <td className="text-sm">{parcel.tracking_id}</td>
              <td>
                <p className="font-medium">{parcel.senderName}</p>
                <p className="text-xs text-gray-500">{parcel.senderContact}</p>
              </td>
              <td>
                <p className="text-sm">
                  {parcel.senderCenter}
                  <span className="text-xl font-bold mx-2">→</span>
                  {parcel.receiverCenter}
                </p>
              </td>
              <td>৳ {parcel.cost}</td>
              <td>
                <span
                  className={`badge ${
                    parcel.payment_status === "paid"
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {parcel.payment_status}
                </span>
              </td>
              <td>
                <span
                  className={`badge ${
                    parcel.delivery_status === "delivered"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {parcel.delivery_status}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-xs bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
                  onClick={() => openAssignModal(parcel)}
                >
                  <FaUserPlus /> Assign Rider
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedParcel && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[80vh] overflow-auto">
            <h3 className="text-lg font-bold mb-2">
              Available Riders in {selectedParcel.senderRegion}
            </h3>

            {riderLoading ? (
              <p>Loading riders...</p>
            ) : riders.length === 0 ? (
              <p className="text-gray-500">
                No riders available in this region.
              </p>
            ) : (
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {riders.map((rider) => (
                  <li
                    key={rider._id}
                    className="border p-2 rounded flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">{rider.name}</p>
                      <p className="text-sm text-gray-500">{rider.email}</p>
                    </div>
                    <button
                      onClick={() => handleAssign(rider)}
                      className="btn btn-xs bg-green-600 text-white"
                      disabled={assigning}
                    >
                      Assign
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="text-right mt-4">
              <button
                onClick={() => setSelectedParcel(null)}
                className="btn btn-sm bg-gray-500 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRider;
