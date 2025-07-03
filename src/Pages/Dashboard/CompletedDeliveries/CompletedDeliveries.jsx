import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../shared/Loading";
import Swal from "sweetalert2";

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: deliveries = [], isLoading, isError } = useQuery({
    queryKey: ["completedDeliveries", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/completed?email=${user.email}`);
      return res.data;
    },
  });

  const calculateEarning = (parcel) => {
    const sameDistrict =
      parcel.senderRegion === parcel.receiverRegion &&
      parcel.senderCenter === parcel.receiverCenter;

    const percentage = sameDistrict ? 0.8 : 0.3;
    return Math.round(parcel.cost * percentage);
  };

  const handleCashOut = () => {
    Swal.fire("Success", "Your cashout request has been submitted.", "success");
    // 👉 You can later implement PATCH or POST to create a cashout request in DB
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-red-600 text-center">Failed to load completed deliveries.</p>
    );

  const totalEarnings = deliveries.reduce((acc, parcel) => acc + calculateEarning(parcel), 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Completed Deliveries</h2>

      {deliveries.length === 0 ? (
        <p className="text-center text-gray-500">No completed deliveries yet.</p>
      ) : (
        <>
          <table className="table w-full mb-4">
            <thead className="bg-base-200 text-left">
              <tr>
                <th>#</th>
                <th>Tracking ID</th>
                <th>From → To</th>
                <th>Cost</th>
                <th>Your Earnings</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((parcel, index) => (
                <tr key={parcel._id} className="hover">
                  <td>{index + 1}</td>
                  <td>{parcel.tracking_id}</td>
                  <td>
                    {parcel.senderCenter}, {parcel.senderRegion}
                    <span className="font-bold mx-2">→</span>
                    {parcel.receiverCenter}, {parcel.receiverRegion}
                  </td>
                  <td>৳ {parcel.cost}</td>
                  <td>৳ {calculateEarning(parcel)}</td>
                  <td>
                    <span className="badge badge-success">{parcel.delivery_status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right">
            <p className="text-lg font-semibold mb-2">
              Total Earnings: <span className="text-lime-600">৳ {totalEarnings}</span>
            </p>
            <button
              onClick={handleCashOut}
              className="btn bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Cash Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CompletedDeliveries;
