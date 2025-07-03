import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Pages/shared/Loading';
import useUserRole from '../Hooks/useUserRole';

const AdminPrivateRoute = ({children}) => {
 
    const {user, loading} = useAuth();
    const{role, authLoading} = useUserRole();
    const location = useLocation();

    if(authLoading || loading){
        return <Loading />
    }

    if(!user){
        return <Navigate to='/login' state={location.pathname} />
    }

    if( role !== "admin"){
        return <Navigate to='/forbidden' />
    }

    return children;
};

export default AdminPrivateRoute;