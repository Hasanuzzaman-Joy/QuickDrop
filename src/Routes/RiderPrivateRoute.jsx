import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Pages/shared/Loading';
import useUserRole from '../Hooks/useUserRole';

const RiderPrivateRoute = ({children}) => {
 
    const {user, loading} = useAuth();
    const{role, authLoading} = useUserRole();
    const location = useLocation();

    if(authLoading || loading){
        return <Loading />
    }

    if(!user){
        return <Navigate to='/login' state={location.pathname} />
    }

    if( role !== "rider"){
        return <Navigate to='/forbidden' />
    }

    return children;
};

export default RiderPrivateRoute;