import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"; 
import useAuth from "./useAuth";

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const{user} = useAuth();

  const {
    data,
    isLoading : authLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/user/role/${user?.email}`);
      return res.data.role;
    },
    enabled: !!user?.email, 
  });

  return {
    role: data,
    authLoading,
    isError,
    error,
    refetch,
  };
};

export default useUserRole;
