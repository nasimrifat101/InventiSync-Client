import axios from "axios";
import { useState } from "react";

const Brands = () => {
  const [data, setData] = useState([]);
  axios.get("/subs.json").then((res) => {
    setData(res.data);
  });
  return (
    <div className="h-[500px]">
      <div className="max-w-6xl mx-auto grid grid-cols-2">
        <div className="space-y-6 pt-10">
          <h2 className="text-9xl text-green-200 font-bold">One Time Payment</h2>
          <p className="w-[550px]">
            Streamline your business operations effortlessly with our
            hassle-free, one-time subscription plan. Experience the power of
            cutting-edge inventory management through our user-friendly
            software. Embrace efficiency and elevate your business to new
            heights.
          </p>
        </div>
        <div>
          <div className="carousel carousel-center max-w-lg p-4 space-x-4 bg-neutral rounded-box mt-20">
            {data.map((item) => (
              <div key={data.id} className="carousel-item">
                <div className="card h-96 w-80 bg-base-300 shadow-xl">
                  <div className="card-body">
                    <h2 className="text-center text-4xl font-bold pb-5">{item.name}</h2>
                    <p className="text-center">{item.description}</p>
                    <div className="card-actions">
                      <button className="btn w-full text-2xl bg-green-200 border-none text-base-300 hover:text-white">{item.price}</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;