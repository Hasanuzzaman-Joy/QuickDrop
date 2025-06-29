import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../shared/Loading';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcels = () => {

    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    const { data: parcels, isLoading, refetch } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data
        }
    })

    const navigate = useNavigate();

    // Delete handler with SweetAlert2
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This parcel will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-parcel/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                icon: "success",
                                title: "You've successfully deleted",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch()
                        }
                    })
                    .catch(err => console.log(err))
            }
        });
    };

    if (isLoading) return <Loading />;

    return (
        <div>
            <table className="w-full md:w-[85%] mx-auto bg-white border border-gray-200 rounded-md shadow-sm text-sm text-gray-700">
                <thead>
                    <tr className="bg-gray-50 text-gray-600">
                        <th className="px-3 py-2 text-left">Type</th>
                        <th className="px-3 py-2 text-left">Title</th>
                        <th className="px-3 py-2 text-left">Cost</th>
                        <th className="px-3 py-2 text-left">Payment</th>
                        <th className="px-3 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map(parcel => (
                        <tr
                            key={parcel._id}
                            className="hover:bg-gray-50 border-t border-gray-200"
                        >
                            <td className="px-3 py-2">{parcel.type}</td>
                            <td className="px-3 py-2">{parcel.title}</td>
                            <td className="px-3 py-2 font-medium">${parcel.cost}</td>
                            <td className="px-3 py-2">
                                <span
                                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${parcel.payment_status === 'paid'
                                        ? 'bg-green-100 text-green-600'
                                        : 'bg-red-100 text-red-600'
                                        }`}
                                >
                                    {parcel.payment_status}
                                </span>
                            </td>
                            <td className="px-3 py-2 space-x-1">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs cursor-pointer">
                                    View
                                </button>
                                {
                                    parcel.payment_status === 'paid' ? " " : <button onClick={() => { navigate(`/payment/${parcel._id}`) }} className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs cursor-pointer">
                                        Pay
                                    </button>
                                }
                                <button onClick={() => handleDelete(parcel._id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs cursor-pointer">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;