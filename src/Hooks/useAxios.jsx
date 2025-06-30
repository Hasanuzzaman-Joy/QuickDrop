import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
})

const useAxios = () => {
    return axiosSecure;
};

export default useAxios;