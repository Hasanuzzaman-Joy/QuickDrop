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
                    path:'payment/:id',
                    element: <PrivateRoute>
                        <Payment />
                    </PrivateRoute>
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
                    path:'dashboard',
                    element: <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                },
                {
                    path:'my-parcels',
                    element: <PrivateRoute>
                        <MyParcels />
                    </PrivateRoute>
                },
                {
                    path:'payment-history',
                    element: <PrivateRoute>
                        <PaymentHistory />
                    </PrivateRoute>
                }
            ]
        }
    ]
)

export default router;