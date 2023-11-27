/* eslint-disable no-unused-vars */
import { Helmet } from "react-helmet-async";
import DashNavSecond from "../extra/DashNavSecond";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CartCard from "../extra/CartCard";
import CheckOutBanner from "./style/CheckOutBanner";
import LoadingPage from "../../ErrorPages/LoadingPage";

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
      <div className="">
        {isLoading ? (
        <LoadingPage></LoadingPage>
        ) : (
          <>
            {products && products.length > 0 ? (
              <div className="grid grid-cols-4 gap-3 p-5">
                {products.map((item) => (
                  <CartCard key={item._id} item={item} refetch={refetch}></CartCard>
                ))}
              </div>
            ) : (
            <CheckOutBanner></CheckOutBanner>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CheckOut;
