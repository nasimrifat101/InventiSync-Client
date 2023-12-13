import { Link } from "react-router-dom";
import SocialLogin from "../../Auth/SocialLogin";
/* eslint-disable react/no-unescaped-entities */
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewsLetter = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_FIRST_KEY,
        import.meta.env.VITE_SEC_KEY,
        form.current,
        import.meta.env.VITE_THIRD_KEY,
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success('Email sent Successfully')
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          toast.warn('Sending Failed')
        }
      );
  };
  return (
    <div className="lg:h-[550px] bg-green-200 text-base-200 mt-20">
      <h1 className="text-4xl text-center p-5 font-bold text-base-200">
        Contact Us
      </h1>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-5">
        <div>
          <form className="space-y-4 p-3 lg:p-0" ref={form} onSubmit={sendEmail}>
            <div>
              <p className="text-xl font-bold">My name is</p>
              <input
                type="text"
                className=" outline-none text-xl font-bold bg-transparent border-b-2 w-full border-black"
                name="user_name"
              />
            </div>
            <div>
              <p className="text-xl font-bold">email id</p>
              <input
                type="text"
                className=" outline-none text-xl font-bold bg-transparent border-b-2 w-full border-black"
                name="user_email"
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
                name="subject"
              />
            </div>
            <div>
              <p className="text-xl font-bold">my question is</p>
              <input
                type="text"
                className=" outline-none text-xl font-bold bg-transparent border-b-2 w-full border-black"
                name="message"
              />
            </div>
            <button type="submit" className="w-full rounded-xl btn">
              send
            </button>

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
      <ToastContainer />
    </div>
  );
};

export default NewsLetter;
