/* eslint-disable react/prop-types */
// import { useState } from "react";
import useAuth from "../../Hooks/useAuth";

const DashNav = ({ total, heading, setSearchTerm  }) => {
  const { user } = useAuth();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
 
  return (
    <div>
      <div className="navbar bg-[#242529]">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">
            {heading} {total}
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
           
            <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            onChange={handleSearch}
          />
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashNav;
