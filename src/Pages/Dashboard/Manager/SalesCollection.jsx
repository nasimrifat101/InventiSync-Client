/* eslint-disable no-unused-vars */
import { Helmet } from "react-helmet-async";
import LoadingPage from "../../ErrorPages/LoadingPage";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DashNav from "../../../Layout/Dashboard/DashNav";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import useAxiosNormal from "../../../Hooks/useAxiosNormal";

const SalesCollection = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosNormal = useAxiosNormal()
  const [searchTerm, setSearchTerm] = useState("");

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

  // Check if products is undefined or loading
  if (isLoading || !products) {
    return <LoadingPage />;
  }

  const filteredProducts = products.filter((item) =>
    item._id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSold = (item) => {
    console.log('Item:', item);
    axiosSecure.get(`/carts/${item._id}`)
    .then((response) => {
      if (response.data) {
        toast.warn("Product is already in the cart. Please clear payment from Checkout tab.")}
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          axiosSecure.post("/carts", item)
            .then((res) => {
              if (res.data.insertedId) {
                toast.success("Added to cart for approval");
              } else {
                toast.warn("Can't sell right now");
              }
            })
            .catch((error) => {
              toast.error("Error adding to cart");
            });
        } else {
          toast.error("Error checking cart");
        }
      });
  };
  
  return (
    <div>
      <Helmet>
        <title>InventiSync | D | Sales Collection</title>
      </Helmet>

      <DashNav
        heading={"Sales Collection"}
        setSearchTerm={setSearchTerm}
      ></DashNav>
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
                      {/* Corrected the structure here */}
                      <td>{item.sellingPrice}</td>
                      <td>
                        <button
                          onClick={() => handleSold(item)}
                          className="btn bg-base-300"
                        >
                          Sold to Customer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SalesCollection;
