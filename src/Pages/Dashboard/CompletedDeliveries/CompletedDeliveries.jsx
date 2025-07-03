import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../shared/Loading";

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const {
    data: completed = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["completedDeliveries", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/completed?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const cashoutMutation = useMutation({
    mutationFn: async (cashOutData) => {
      const res = await axiosSecure.post("/rider/cashOut", cashOutData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Cashout successful!", "success");
      queryClient.invalidateQueries(["completedDeliveries"]);
      queryClient.invalidateQueries(["riderEarnings"]);
    },
    onError: () => {
      Swal.fire("Error", "Cashout failed", "error");
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center text-red-600">Failed to load deliveries</p>
    );

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Completed Deliveries</h2>
      <table className="table w-full">
        <thead>
          <tr className="bg-base-200 text-left">
            <th>#</th>
            <th>Tracking ID</th>
            <th>From → To</th>
            <th>Cost</th>
            <th>Commission</th>
            <th>Delivered At</th>
            <th>Cashout</th>
          </tr>
        </thead>
        <tbody>
          {completed.map((parcel, idx) => {
            const isSameDistrict =
              parcel.senderCenter === parcel.receiverCenter &&
              parcel.senderRegion === parcel.receiverRegion;
            const commission = isSameDistrict
              ? parcel.cost * 0.8
              : parcel.cost * 0.3;

            const isCashedOut = parcel.cashOut === true;

            return (
              <tr key={parcel._id} className="hover">
                <td>{idx + 1}</td>
                <td>{parcel.tracking_id}</td>
                <td>
                  {parcel.senderCenter} → {parcel.receiverCenter}
                </td>
                <td>৳ {parcel.cost}</td>
                <td>৳ {commission.toFixed(2)}</td>
                <td>{new Date(parcel.delivered_at).toLocaleString()}</td>
                <td>
                  <button
                    className={`btn btn-xs ${
                      isCashedOut
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600"
                    } text-white`}
                    disabled={isCashedOut || cashoutMutation.isLoading}
                    onClick={() =>
                      cashoutMutation.mutate({
                        parcelId: parcel._id,
                        amount: parcel.cost,
                        riderEmail: user.email,
                        riderName: user.displayName || "Unknown Rider",
                        trackingId: parcel.tracking_id,
                      })
                    }
                  >
                    {isCashedOut ? "Cashed Out" : "Cashout"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedDeliveries;
