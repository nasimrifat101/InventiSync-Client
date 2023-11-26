/* eslint-disable no-unused-vars */
import { Helmet } from "react-helmet-async";
import LoadingPage from "../../ErrorPages/LoadingPage";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DashNav from "../../../Layout/Dashboard/DashNav";
import { useState } from "react";

const SalesCollection = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", user.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/product/specific/email?email=${user.email}`
      );
      return response.data;
    },
  });

  const filteredProducts = products.filter((item) =>
  item._id.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div>
      <Helmet>
        <title>InventiSync | D | Sales Collection</title>
      </Helmet>

      <DashNav heading={"Sales Collection"} setSearchTerm={setSearchTerm}></DashNav>
      <div>
        {isLoading ? (
          <LoadingPage></LoadingPage>
        ) : (
          <div className="">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Discount</th>
                    <th>Selling Price</th>
                    <th>Record Product</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {filteredProducts.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={item.logo} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-sm opacity-50">{item._id}</div>
                          </div>
                        </div>
                      </td>
                      <td>{item.quantity}</td>
                      <td>{item.discount}</td>
                      <th>
                        <td>{item.sellingPrice}</td>
                      </th>
                      <th>
                        <button className="btn bg-base-300">Sold to Customer</button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesCollection;
