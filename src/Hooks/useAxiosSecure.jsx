import axios from 'axios';
import useAuth from '../Hooks/useAuth';
import { useEffect } from 'react';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = user?.accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          logOut();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut]);

  return axiosSecure;
};

export default useAxiosSecure;
