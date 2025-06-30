import axios from 'axios';
import useAuth from '../Hooks/useAuth';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
})

const useAxiosSecure = () => {

    const { user } = useAuth();
    const token = user?.accessToken;
    
    axiosSecure.interceptors.request.use(config => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
        error => {
            return Promise.reject(error)
        })

    return axiosSecure;
};

export default useAxiosSecure;