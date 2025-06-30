import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import Loading from "../shared/Loading";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/approved");
      return res.data;
    },
  });

  console.log(riders);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the rider permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/riders/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Rider has been deleted.", "success");
            refetch();
          }
        } catch (error) {
          console.error("Deletion failed:", error);
          Swal.fire("Error", "Failed to delete rider.", "error");
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Region</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Warehouse</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.region}</td>
                <td>{rider.email}</td>
                <td>{rider.contact}</td>
                <td>{rider.warehouse}</td>
                <td>
                  <span className="px-2 py-1 bg-green-500 text-white rounded text-sm font-semibold">
                    Approved
                  </span>
                </td>
                <td className="flex flex-wrap gap-1">
                  <button
                    onClick={() => handleDelete(rider._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedRider(rider)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedRider && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Rider Details</h3>
            <table className="table-auto w-full text-left text-sm">
              <tbody>
                {Object.entries(selectedRider).map(([key, value]) => (
                  <tr key={key}>
                    <td className="font-medium capitalize">{key}</td>
                    <td className="text-gray-700">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right mt-4">
              <button
                onClick={() => setSelectedRider(null)}
                className="bg-gray-500 text-white px-4 py-1 rounded"
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

export default ActiveRiders;
