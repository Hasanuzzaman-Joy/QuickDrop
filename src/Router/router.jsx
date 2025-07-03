import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import AuthLayouts from "../Layouts/AuthLayouts";
import Login from "../Pages/Auth//Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Coverage from "../Pages/Coverage/Coverage/Coverage";
import AddParcel from "../Pages/Parcel/AddParcel/AddParcel";
import Loading from "../Pages/shared/Loading";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import PrivateRoute from "../Routes/PrivateRoute";
import Payment from "../Pages/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import BeARider from "../Pages/BeARider/BeARider";
import PendingRiders from "../Pages/Riders/PendingRiders";
import ActiveRiders from "../Pages/Riders/ActiveRiders";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminPrivateRoute from "../Routes/AdminPrivateRoute";
import AssignRider from "../Pages/Parcel/AddParcel/AssignRider/AssignRider";
import PendingDeliveries from "../Pages/Dashboard/PendingDeliveries/PendingDeliveries"
import RiderPrivateRoute from "../Routes/RiderPrivateRoute";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <RootLayouts />,
            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: 'coverage',
                    element: <Coverage />,
                    loader: () => fetch('/warehouses.json'),
                    hydrateFallbackElement: <Loading />
                },
                {
                    path: 'add-parcel',
                    element: <PrivateRoute>
                        <AddParcel />
                    </PrivateRoute>,
                    loader: () => fetch('/warehouses.json'),
                    hydrateFallbackElement: <Loading />
                },
                {
                    path: 'be-a-rider',
                    element: <PrivateRoute>
                        <BeARider />
                    </PrivateRoute>,
                    loader: () => fetch('/warehouses.json'),
                    hydrateFallbackElement: <Loading />
                },
                {
                    path: 'payment/:id',
                    element: <PrivateRoute>
                        <Payment />
                    </PrivateRoute>
                },
                {
                    path: '/forbidden',
                    element: <Forbidden />
                }
            ]
        },
        {
            path: '/',
            element: <AuthLayouts />,
            children: [
                {
                    path: 'login',
                    element: <Login />
                },
                {
                    path: 'register',
                    element: <Register />
                }
            ]
        },
        {
            path: '/',
            element: <DashboardLayouts />,
            children: [
                {
                    path: 'dashboard',
                    element: <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                },
                {
                    path: 'my-parcels',
                    element: <PrivateRoute>
                        <MyParcels />
                    </PrivateRoute>
                },
                {
                    path: 'payment-history',
                    element: <PrivateRoute>
                        <PaymentHistory />
                    </PrivateRoute>
                },
                {
                    path: 'active-riders',
                    element: <AdminPrivateRoute>
                        <ActiveRiders />
                    </AdminPrivateRoute>
                },
                {
                    path: 'pending-riders',
                    element: <AdminPrivateRoute>
                        <PendingRiders />
                    </AdminPrivateRoute>
                },
                {
                    path: 'make-admin',
                    element: <AdminPrivateRoute>
                        <MakeAdmin />
                    </AdminPrivateRoute>
                },
                {
                    path: 'assign-rider',
                    element: <AdminPrivateRoute>
                        <AssignRider />
                    </AdminPrivateRoute>
                },
                {
                    path: 'pending-deliveries',
                    element:<RiderPrivateRoute>
                        <PendingDeliveries />
                    </RiderPrivateRoute> 
                },
                {
                    path: 'completed-deliveries',
                    element:<RiderPrivateRoute>
                        <CompletedDeliveries />
                    </RiderPrivateRoute> 
                }
            ]
        }
    ]
)

export default router;