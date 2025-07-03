import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../shared/Loading";

const EarningsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: earningsRaw = [], isLoading } = useQuery({
    queryKey: ["riderEarningsRaw", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/earnings-raw?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // Date calculations
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  // Initialize sums
  let total = 0,
    today = 0,
    week = 0,
    month = 0,
    year = 0;

  earningsRaw.forEach(({ amount, cashOutDate }) => {
    if (!amount || !cashOutDate) return;
    const date = new Date(cashOutDate);

    total += amount;

    if (date >= startOfYear) year += amount;
    if (date >= startOfMonth) month += amount;
    if (date >= startOfWeek) week += amount;
    if (date >= startOfToday) today += amount;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📊 Rider Earnings Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-green-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Today</h2>
            <p className="text-2xl font-bold">৳ {today.toFixed(2)}</p>
          </div>
        </div>

        <div className="card bg-blue-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">This Week</h2>
            <p className="text-2xl font-bold">৳ {week.toFixed(2)}</p>
          </div>
        </div>

        <div className="card bg-yellow-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">This Month</h2>
            <p className="text-2xl font-bold">৳ {month.toFixed(2)}</p>
          </div>
        </div>

        <div className="card bg-purple-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">This Year</h2>
            <p className="text-2xl font-bold">৳ {year.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">Total Earned (Cashouts)</h3>
        <p className="text-3xl text-lime-600 font-bold">৳ {total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default EarningsPage;
