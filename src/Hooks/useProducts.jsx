import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useProducts = () => {
  const axiosSecure = useAxiosSecure();

  const { data: products, refetch, isLoading } = useQuery({
    queryKey: "products",
    queryFn: async () => {
      const response = await axiosSecure.get("/products");
      return response.data;
    },
  });

  return { products, refetch, isLoading };
};

export default useProducts;
