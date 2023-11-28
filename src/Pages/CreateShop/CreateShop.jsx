/* eslint-disable no-unused-vars */
import Navbar from "../Home/Components/Navbar/Navbar";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import useAxiosNormal from "../../Hooks/useAxiosNormal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateShop = () => {
  const { user } = useAuth();
  const axiosNormal = useAxiosNormal();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    // host image
    setIsLoading(true);
    const imageFile = { image: data.image[0] };
    const res = await axiosNormal.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(res.data);

    if (res.data.success) {
      const name = data.name;
      const logo = res.data.data.display_url;
      const location = data.location;
      const category = data.category;
      const info = data.description;
      const owner = user?.displayName;
      const OwnerEmail = user?.email;
      const photo = user?.photoURL;

      const shop = {
        name,
        logo,
        location,
        category,
        info,
        owner,
        OwnerEmail,
        photo,
      };
      console.log(shop);
      axiosSecure
        .post("/shop", shop)
        .then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            toast.success("Shop Created successfully");
            navigate('/dashboard')
          }
        })
        .catch((error) => {
          console.error("Error creating shop:", error);
          toast.warn("You already have a shop");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  return (
    <div>
      <Navbar></Navbar>
      <Helmet>
        <title>InventiSync | Create Shop</title>
      </Helmet>
      <div className="max-w-6xl mx-auto grid grid-cols-2">
        <div className="p-8">
          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <p className="text-4xl font-bold text-green-300">Fill in</p>
            {/* name */}
            <div className="form-control w-full">
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Shop Name"
                className="input input-bordered"
              />
            </div>
            {/* logo */}
            <div className="form-control w-full">
              <input
                type="file"
                {...register("image", { required: "Photo is required" })}
                accept="image/*"
                className="mt-1 p-2 border rounded-md"
              />
            </div>
            {/* location */}
            <div className="form-control w-full">
              <input
                type="text"
                {...register("location", { required: "Email is required" })}
                placeholder="Shop Location"
                className="input input-bordered"
              />
            </div>
            {/* category */}
            <div className="form-control w-full">
              <input
                type="text"
                {...register("category", { required: "Email is required" })}
                placeholder="Shop Category"
                className="input input-bordered"
              />
            </div>
            {/* info */}
            <div className="form-control w-full">
              <textarea
                type="text"
                {...register("description", { required: "Email is required" })}
                placeholder="Shop description"
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
                value="Create Shop"
                className="btn w-full bg-green-300 text-black hover:text-white"
              />
            )}
          </form>
        </div>
        <div>
          <img src="https://i.postimg.cc/zBpN1Nvc/pexels-dids-2911527.jpg" className="h-[500px] w-full" />
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default CreateShop;
