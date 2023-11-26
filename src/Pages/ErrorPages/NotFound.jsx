/* eslint-disable react/no-unescaped-entities */

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-white text-black">
      <div className="flex flex-col justify-center items-center space-y-2 min-h-screen">
        <div className="space-y-5">
          <p className="text-7xl font-extrabold">Opps</p>
          <p className="text-center">you're lost</p>
        </div>
        <div>
          <img
            src="https://i.postimg.cc/nzsmFJf6/Group-1.png"
            alt=""
            className="w-[400px]"
          />
        </div>
        <div className="border-b-2 border-black pt-10 font-bold">
         <Link to='/'>
         <p>Go Home</p>
         </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
