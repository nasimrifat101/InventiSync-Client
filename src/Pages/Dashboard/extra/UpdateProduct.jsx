/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQueryClient } from "@tanstack/react-query";

const UpdateProduct = ({ id }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  axiosSecure.get(`/products/single/${id}`).then((res) => {
    setProduct(res.data);
  });

  const onSubmit = async (data) => {
    const name = data.name;
    const logo = data.image;
    const location = data.location;
    const quantity = parseFloat(data.quantity);
    const info = data.description;
    const profit = parseFloat(data.profit);
    const cost = parseFloat(data.cost);
    const discount = parseFloat(data.discount);

    const taxPercentage = 7.5;

    const taxAmount = (cost * taxPercentage) / 100;

    const sellingPrice = cost + taxAmount + (cost * profit) / 100;

    const product = {
      name,
      logo,
      location,
      quantity,
      info,
      profit,
      cost,
      discount,
      sellingPrice,
    };
    console.log(product);

    axiosSecure.put(`/product/single/update/${id}`, product).then((res) => {
      console.log(res.data);

      if (res.data.modifiedCount) {
        toast.success("Product Successfully Updated");
        queryClient.invalidateQueries(["products", user.email]);
      } else {
        toast.warn("Update Failed");
      }
    });
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-4xl font-bold text-green-300">Fill in</p>
        {/* name */}
        <div className="form-control w-full">
          <label>Product Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            defaultValue={product.name}
            className="input input-bordered"
          />
        </div>
        <div className="form-control w-full">
          <label>Image URL</label>
          <input
            type="text"
            {...register("image", { required: "Image Url is required" })}
            defaultValue={product.logo}
            className="input input-bordered"
          />
        </div>

        {/* Flex div */}

        <div className="form-control w-full">
          <label>Product Location</label>
          <input
            type="text"
            {...register("location", {
              required: "Location is required",
            })}
            defaultValue={product.location}
            className="input input-bordered"
          />

          <div className="form-control w-full pt-3">
            <label>Product Quantity</label>
            <input
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
              })}
              defaultValue={product.quantity}
              className="input input-bordered"
            />
          </div>
        </div>
        {/* Flex div */}
        <div className="form-control w-full">
          <label>Buying Price</label>
          <input
            type="number"
            {...register("cost", { required: "Cost is required" })}
            defaultValue={product.cost}
            className="input input-bordered"
          />
        </div>
        <div className="form-control w-full">
          <label>Profit Margin</label>
          <input
            type="number"
            {...register("profit", { required: "Profit is required" })}
            defaultValue={product.profit}
            className="input input-bordered"
          />
        </div>

        {/* category */}
        <div className="form-control w-full">
          <label>Discount</label>
          <input
            type="number"
            {...register("discount", { required: "Discount is required" })}
            defaultValue={product.discount}
            className="input input-bordered"
          />
        </div>
        {/* info */}
        <div className="form-control w-full">
          <label>Product Description</label>
          <textarea
            type="text"
            {...register("description", { required: "Email is required" })}
            defaultValue={product.info}
            className="input input-bordered"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center btn">
            <span className="loading loading-infinity loading-lg"></span>
          </div>
        ) : (
          <input
            type="submit"
            value="Update Product"
            className="btn w-full bg-green-300 text-black hover:text-white"
          />
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateProduct;
