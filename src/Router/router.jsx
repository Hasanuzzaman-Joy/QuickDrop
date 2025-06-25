import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import AuthLayouts from "../Layouts/AuthLayouts";
import Login from "../Pages/Auth//Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Coverage from "../Pages/Coverage/Coverage/Coverage";
import AddParcel from "../Pages/Parcel/AddParcel/AddParcel";
import Loading from "../Pages/shared/Loading";

const router = createBrowserRouter(
    [
        {
            path:'/',
            element:<RootLayouts />,
            children:[
                {
                    index:true,
                    element:<Home />
                },
                {
                    path:'coverage',
                    element:<Coverage />,
                    loader: () => fetch('/warehouses.json'),
                    hydrateFallbackElement:<Loading />
                },
                {
                    path:'add-parcel',
                    element:<AddParcel />,
                    loader: () => fetch('/warehouses.json'),
                    hydrateFallbackElement:<Loading />
                }
            ]
        },
        {
            path:'/',
            element:<AuthLayouts />,
            children:[
                {
                    path:'login',
                    element:<Login />
                },
                {
                    path:'register',
                    element:<Register />
                }
            ]
        }
    ]
)

export default router;