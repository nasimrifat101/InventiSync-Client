/* eslint-disable no-unused-vars */
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import DashNavSecond from "./DashNavSecond";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosNormal from "../../../Hooks/useAxiosNormal";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2/dist/sweetalert2.js";

const AddProducts = () => {
  const { user } = useAuth();
  const axiosNormal = useAxiosNormal();
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/individual/${user.email}`)
        .then((res) => {
          setUserData(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [axiosSecure, user?.email]);

  const onSubmit = async (data) => {
    // host image
    setIsLoading(true);

    console.log("Checking product limit...");
    const userCanAddProduct = await axiosSecure.get(
      `/users/can-add-product/${user.email}`
    );

    console.log("User can add product:", userCanAddProduct.data.canAddProduct);

    if (!userCanAddProduct.data.canAddProduct) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Product limit reached",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/dashboard/payment");
      setIsLoading(false);
      return;
    }

    console.log("Adding product...");

    const name = data.name;
    const logo = data.image;
    const location = data.location;
    const quantity = parseFloat(data.quantity);
    const info = data.description;
    const profit = parseFloat(data.profit);
    const cost = parseFloat(data.cost);
    const discount = parseFloat(data.discount);
    // extra
    const shopId = userData.shopId;
    const shopName = userData.shopName;
    const owner = user?.displayName;
    const OwnerEmail = user?.email;
    const tax = 0.075; // 7.5% Tax
    const sellingPrice =
      parseFloat(cost) +
      parseFloat(cost) * tax +
      (parseFloat(cost) * profit) / 100;
    const formattedSellingPrice = sellingPrice.toFixed(2);
    const productAddedDate = new Date();
    const year = productAddedDate.getFullYear();
    const month = productAddedDate.getMonth() + 1; // Months are zero-based, so we add 1
    const day = productAddedDate.getDate();

    // Extract time components
    const hours = productAddedDate.getHours();
    const minutes = productAddedDate.getMinutes();
    const seconds = productAddedDate.getSeconds();

    // Create separate date and time strings
    const dateStr = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    const timeStr = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    const salesCount = 0;

    const product = {
      name,
      logo,
      location,
      info,
      profit,
      cost,
      discount,
      shopId,
      shopName,
      owner,
      OwnerEmail,
      sellingPrice : parseFloat(formattedSellingPrice),
      dateStr,
      timeStr,
      salesCount,
      quantity,
    };
    console.log(product);
    axiosSecure
      .post("/products", product)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          toast.success("Product added successfully");
          // navigate("/dashboard/myproducts");
        }
      })
      .catch((error) => {
        console.error("Error :", error);
        toast.warn("product cant be added at the moment");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const hadnleclick = () => {
    navigate("/dashboard/myproducts");
  };

  return (
    <div>
      <DashNavSecond
        heading={"Add products to your store"}
        click={hadnleclick}
        text="Back to My Products"
      ></DashNavSecond>
      <Helmet>
        <title>InventiSync | D | M | Add Products</title>
      </Helmet>
      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-5">
        <div>
          <img
            src="https://i.postimg.cc/GmPptZ5b/pexels-eberhard-grossgasteiger-2086361.jpg"
            alt=""
            className="h-[500px] w-full"
          />
        </div>
        <div className="">
          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <p className="text-4xl font-bold text-green-300">Fill in</p>
            {/* name */}
            <div className="form-control w-full">
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Product Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control w-full">
              <input
                type="text"
                {...register("image", { required: "Image Url is required" })}
                placeholder="Image Url"
                className="input input-bordered"
              />
            </div>

            {/* Flex div */}
            <div className="flex space-x-3">
              <div className="form-control w-full">
                <input
                  type="text"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  placeholder="Product Location"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control w-full">
                <input
                  type="number"
                  {...register("quantity", {
                    required: "Quantity is required",
                  })}
                  placeholder="Product Quantity"
                  className="input input-bordered"
                />
              </div>
            </div>
            {/* Flex div */}
            <div className="flex space-x-3">
              <div className="form-control w-full">
                <input
                  type="number"
                  {...register("cost", { required: "Email is required" })}
                  placeholder="Production Cost"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control w-full">
                <input
                  type="number"
                  {...register("profit", { required: "Email is required" })}
                  placeholder="Profit Margin %"
                  className="input input-bordered"
                />
              </div>
            </div>
            {/* category */}
            <div className="form-control w-full">
              <input
                type="text"
                {...register("discount", { required: "Email is required" })}
                placeholder="Discount %"
                className="input input-bordered"
              />
            </div>
            {/* info */}
            <div className="form-control w-full">
              <textarea
                type="text"
                {...register("description", { required: "Email is required" })}
                placeholder="Product description"
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
                value="Add Product"
                className="btn w-full bg-green-300 text-black hover:text-white"
              />
            )}
          </form>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default AddProducts;
