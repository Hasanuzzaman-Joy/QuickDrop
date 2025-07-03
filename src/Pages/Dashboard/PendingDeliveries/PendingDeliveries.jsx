import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../shared/Loading";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: deliveries = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["pendingDeliveries", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/pending-deliveries?email=${user?.email}`
      );
      return res.data;
    },
  });

  const updateDeliveryMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/rider/update-delivery/${id}`, {
        status,
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Delivery status updated!", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong", "error");
    },
  });

  const handleUpdate = (id, newStatus) => {
    updateDeliveryMutation.mutate({ id, status: newStatus });
  };

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-center text-red-500">Failed to load deliveries</p>;

  return (
    <div className="p-5 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Pending Deliveries</h2>
      <table className="table w-full">
        <thead>
          <tr className="bg-base-200 text-left">
            <th>#</th>
            <th>Tracking ID</th>
            <th>Receiver</th>
            <th>To</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>
              <td>{parcel.tracking_id}</td>
              <td>
                <p className="font-medium">{parcel.receiverName}</p>
                <p className="text-xs text-gray-500">{parcel.receiverContact}</p>
              </td>
              <td>
                {parcel.receiverRegion}, {parcel.receiverCenter}
              </td>
              <td>৳ {parcel.cost}</td>
              <td>
                <span className="badge badge-warning">
                  {parcel.delivery_status}
                </span>
              </td>
              <td>
                {parcel.delivery_status === "rider assigned" ? (
                  <button
                    className="btn btn-xs bg-blue-600 text-white"
                    onClick={() => handleUpdate(parcel._id, "in-transit")}
                  >
                    Collected
                  </button>
                ) : parcel.delivery_status === "in-transit" ? (
                  <button
                    className="btn btn-xs bg-green-600 text-white"
                    onClick={() => handleUpdate(parcel._id, "delivered")}
                  >
                    Mark as Delivered
                  </button>
                ) : (
                  <span className="text-gray-500 text-xs">No action</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingDeliveries;
