import { Helmet } from "react-helmet-async";
import { RiHome2Fill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const location = useLocation();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      navigate(location?.state ? location.state : "/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid email or password. Please try again.");
    }
  };


  return (
    <div className="">
      <Helmet>
        <title>InventiSync | Login</title>
      </Helmet>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2">
        <div className="p-10 hidden lg:block">
          <img
            src="https://i.postimg.cc/26G0zg4P/pramod-tiwari-jokb6u-SXflc-unsplash.jpg"
            alt=""
            className="h-[480px] w-full"
          />
        </div>
        <div className="items-center space-y-2 p-10">
          <p className="font-semibold text-3xl">Login to</p>
          <p className="text-3xl lg:text-5xl font-bold text-green-400">InventiSync</p>
          <div className="pt-5 space-y-3">
            <Link to="/">
              <button className="btn w-full" aria-label="Go to Home">
                <RiHome2Fill />
                Home
              </button>
            </Link>
            <SocialLogin></SocialLogin>
          </div>
          <div className="divider"></div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control w-full">
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Your Email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control w-full">
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Password must meet the requirements: at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long.",
                  },
                })}
                placeholder="Your Password"
                className="input input-bordered"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <input type="submit" value="Login" className="btn w-full" />
            <div className="flex justify-between">
              <p>Dont have an account?</p>
              <Link to="/signUp">
                <p className="underline text-green-300">SignUp</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
