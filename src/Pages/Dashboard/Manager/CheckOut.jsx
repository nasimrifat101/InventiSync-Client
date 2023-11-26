/* eslint-disable no-unused-vars */
import { Helmet } from "react-helmet-async";
import DashNavSecond from "../extra/DashNavSecond";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CartCard from "../extra/CartCard";

const CheckOut = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", user.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/cart/specific/email?email=${user.email}`
      );
      return response.data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>InventiSync | D | Check Out</title>
      </Helmet>
      <DashNavSecond heading={"Check Out"}></DashNavSecond>
      <div className="grid grid-cols-4 gap-3 p-5">
        {products.map((item) => (
          <CartCard key={item._id} item={item}></CartCard>
        ))}
      </div>
    </div>
  );
};

export default CheckOut;
