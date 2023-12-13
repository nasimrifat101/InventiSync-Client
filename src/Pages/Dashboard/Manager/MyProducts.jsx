/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import QRCode from 'react-qr-code';
import { useNavigate } from "react-router-dom";
import DashNavSecond from "../extra/DashNavSecond";
import useProducts from "../../../Hooks/useProducts";
// import MyProductsCard from "../extra/MyProductsCard";
import LoadingPage from "../../ErrorPages/LoadingPage";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UpdateProduct from "../extra/UpdateProduct";
import { Helmet } from "react-helmet-async";

const MyProducts = () => {
  const navigate = useNavigate();
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
        `/product/specific/email?email=${user.email}`
      );
      return response.data;
    },
  });

  const handleClick = () => {
    navigate("/dashboard/myproducts/addproducts");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/products/delete/${id}`).then((response) => {
          if (response.data.deletedCount) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            refetch();
          } else {
            Swal.fire("Error!", "Failed to delete the file.", "error");
          }
        });
      }
    });
  };


  return (
    <div>
      <Helmet><title>InventiSync | D | My Products</title></Helmet>
      <DashNavSecond
        heading={"All Products"}
        click={handleClick}
        text="Add Products"
      ></DashNavSecond>
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
                  <th>Product Quantity</th>
                  <th>Sale Count</th>
                  <th>Update Product</th>
                  <th>Delete Product</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {products.map((item) => (
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
                          <div className="text-sm opacity-50">
                            {item.shopName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.salesCount}</td>
                    <td>

                      <QRCode
                        value={`Product ID: ${item._id}\nProduct Name: ${item.name}\nQuantity: ${item.quantity}`}
                        size={80}  // Adjust the size as needed
                      />
                    </td>
                    <th>
                      {/* The button to open modal */}
                      <label htmlFor={`my_modal_${item._id}`} className="btn">
                        Update
                      </label>

                      {/* Put this part before </body> tag */}
                      <input
                        type="checkbox"
                        id={`my_modal_${item._id}`}
                        className="modal-toggle"
                      />
                      <div className="modal" role="dialog">
                        <div className="modal-box">
                          {/* form goes here */}
                          <UpdateProduct id={item._id}></UpdateProduct>
                        </div>
                        <label className="modal-backdrop" htmlFor={`my_modal_${item._id}`}>
                          Close
                        </label>
                      </div>
                    </th>
                    <th>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn bg-base-300"
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
