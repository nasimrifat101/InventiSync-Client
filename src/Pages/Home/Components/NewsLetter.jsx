import { Link } from "react-router-dom";
import SocialLogin from "../../Auth/SocialLogin";

const NewsLetter = () => {
  return (
    <div className="lg:h-[550px] bg-green-200 text-base-200 mt-20">
      <h1 className="text-4xl text-center p-5 font-bold text-base-200">
        Contact Us
      </h1>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-5">
        <div>
          <form className="space-y-4 p-3 lg:p-0">
            <div>
              <p className="text-xl font-bold">My name is</p>
              <input
                type="text"
                className=" outline-none text-xl font-bold bg-transparent border-b-2 w-full border-black"
              />
            </div>
            <div>
              <p className="text-xl font-bold">email id</p>
              <input
                type="text"
                className=" outline-none text-xl font-bold bg-transparent border-b-2 w-full border-black"
              />
            </div>
            <div>
              <p className="text-xl font-bold">company name</p>
              <input
                type="text"
                className=" outline-none text-xl font-bold bg-transparent border-b-2 w-full border-black"
              />
            </div>
            <div>
              <p className="text-xl font-bold">subject of inquire</p>
              <input
                type="text"
                className=" outline-none text-xl font-bold bg-transparent border-b-2 w-full border-black"
              />
            </div>
            <div>
              <p className="text-xl font-bold">my question is</p>
              <input
                type="text"
                className=" outline-none text-xl font-bold bg-transparent border-b-2 w-full border-black"
              />
            </div>
            <button className="w-full rounded-xl btn">send</button>
          </form>
        </div>
        <div>
          <div className="hero h-full rounded-2xl lg:bg-base-300 p-3 lg:p-0">
            <div className="hero-content text-center">
              <div className="max-w-md space-y-4 lg:text-white">
                <p className="pb-5 text-5xl font-semibold">
                  {" "}
                  Join us and grow with resources tailored for your business.
                </p>
                <Link to="/login">
                  {" "}
                  <button className="btn w-full">Login</button>
                </Link>
                <SocialLogin></SocialLogin>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
