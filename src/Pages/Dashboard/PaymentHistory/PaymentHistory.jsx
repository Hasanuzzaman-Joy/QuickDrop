import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../..//shared/Loading';
import useAuth from '../../../Hooks/useAuth';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Fetch payment data based on user's email
    const { data: payments = [], isPending } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !!user?.email, // only run when email is available
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });

    if (isPending) return <Loading />;

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-bold mb-4">💳 Payment History</h2>
            {payments.length === 0 ? (
                <p className="text-gray-500">No payment history found.</p>
            ) : (
                <table className="table w-full table-zebra">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Parcel ID</th>
                            <th>Amount (৳)</th>
                            <th>Transaction ID</th>
                            <th>Paid Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment.id || payment._id}>
                                <td>{index + 1}</td>
                                <td>{payment.parcelId}</td>
                                <td>{payment.amount}</td>
                                <td className="text-blue-600 font-mono text-sm">{payment.transactionId}</td>
                                <td>{new Date(payment.paid_date || payment.paid_date_string).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PaymentHistory;
