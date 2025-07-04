import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../shared/Loading";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const Dashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["delivery-status-summary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/delivery-status-summary");
      return res.data;
    }
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-center mt-10 text-red-500">Failed to load data.</div>
    );

  const { totalOrders, summary } = data;

  // Colors for each segment
  const COLORS = ["#34d399", "#facc15", "#f87171", "#60a5fa", "#c084fc"];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📊 Delivery Status Summary</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {/* Total Orders Card */}
        <div className="card bg-base-100 shadow-md border">
          <div className="card-body text-center">
            <h2 className="text-lg font-semibold text-primary">Total Orders</h2>
            <p className="text-3xl font-bold">{totalOrders}</p>
          </div>
        </div>

        {/* Loop Through Each Delivery Status */}
        {summary.map((item) => (
          <div
            key={item.status}
            className="card bg-base-100 shadow-md border"
          >
            <div className="card-body text-center">
              <h2 className="text-lg font-semibold capitalize text-secondary">
                {item.status}
              </h2>
              <p className="text-3xl font-bold">{item.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pie Chart Section */}
      <div className="bg-white shadow rounded-lg p-6 max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-center">Delivery Status Pie Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={summary}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              label
            >
              {summary.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
