/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { GrUserManager } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import { BiInfoCircle, BiSolidCategoryAlt } from "react-icons/bi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { Link } from "react-router-dom";

const StoreCard = ({ data }) => {
  const { name, logo, location, category, info, productLimit, owner } = data;
  return (
    <div>
      <div className="card card-compact h-96 w-96 bg-base-100 shadow-xl m-5">
        <figure>
          <img src={logo} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <div className="flex items-center justify-between">
            <div className="flex justify-center items-center space-x-1">
              <GrUserManager className="text-lg" />
              <p className="font-semibold">{owner}</p>
            </div>
            <div className="flex justify-center items-center space-x-1">
              <FaLocationDot className="text-lg" />
              <p className="font-semibold">{location}</p>
            </div>
          </div>
          {/*  */}
          <div className="flex items-center justify-between">
            <div className="flex justify-center items-center space-x-1">
              <BiSolidCategoryAlt className="text-lg" />
              <p className="font-semibold"> {category}</p>
            </div>
            <div className="flex justify-center items-center space-x-1">
              <MdProductionQuantityLimits className="text-lg" />
              <p className="font-semibold">{productLimit}</p>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-1">
            <MdOutlineDescription className="text-lg" />
            <p className="font-semibold">{info}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
