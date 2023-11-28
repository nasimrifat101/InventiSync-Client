import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";

const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { user, logOut } = useAuth();

  const handleUserClick = () => {
    setShowOptions(!showOptions);
  };

  const navlinks = (
    <>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#4aed8b] underline" : ""
          }
          to="/"
        >
          <span className="font-semibold">Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#4aed8b] underline" : ""
          }
          to="/createShop"
        >
          <span className="font-semibold">Create Shop</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#4aed8b] underline" : ""
          }
          to="/dashboard"
        >
          <span className="font-semibold">Dashboard</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-[#4aed8b] underline" : ""
          }
          to="https://www.youtube.com/watch?v=S9bCLPwzSC0&list=RDMM&index=6"
          target="_blank"
        >
          <span className="font-semibold">Watch Demo</span>
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navlinks}
            </ul>
          </div>
          <Link to="/" className="lg:text-xl font-bold">
            InventiSync
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navlinks}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="">
              <div
                onClick={handleUserClick}
                className="cursor-pointer flex items-center"
              >
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-8 h-8 rounded-full mx-2"
                  />
                )}
              </div>
              {showOptions && (
                <div className="absolute right-0 mt-2 p-2 bg-white border rounded shadow z-10">
                  <div
                    className="cursor-pointer hover:text-blue-500 font-semibold"
                    onClick={handleUserClick}
                  >
                    {user.displayName}
                  </div>
                  <div
                    className="cursor-pointer hover:text-white hover:bg-black border-none font-semibold btn btn-error w-full"
                    onClick={logOut}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-ghost font-semibold">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
