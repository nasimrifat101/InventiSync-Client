import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAdminManager = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isPending } = useQuery({
    queryKey: [user?.email, 'isAdminManager'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin-manager/${user.email}`);
      console.log(res.data); // Log the response
      return res.data;
    }
  });

  return [data, isPending];
};


export default useAdminManager;
