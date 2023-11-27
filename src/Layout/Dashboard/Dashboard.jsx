/* eslint-disable no-unused-vars */
import { Helmet } from "react-helmet-async";
import { Link, Outlet, useLocation } from "react-router-dom";
import useAdminManager from "../../Hooks/useAdmin";
import useAuth from "../../Hooks/useAuth";

const Dashboard = () => {
  const [userData, userDataLoading] = useAdminManager();
  const {logOut} = useAuth()
  const location = useLocation();
  const isLinkActive = (path) => location.pathname.startsWith(path);

  return (
    <div>
      <Helmet>
        <title>InventiSync | Dashboard</title>
      </Helmet>

      <div className="flex">
        <div className="w-64 min-h-screen border-r border-gray-700">
          <p className="text-center font-bold text-2xl py-3 ">InventiSync</p>
          <ul className="menu space-y-2">
            {userData && (
              <>
                {userData.role === "admin" && (
                  <>
                    <li>
                      <Link
                        to="manageShops"
                        className={`${
                          isLinkActive("manageShops")
                            ? "bg-black text-white"
                            : "bg-base-300 hover:bg-black hover:text-white"
                        } p-3 font-semibold`}
                      >
                        Manage Shops
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="allUsers"
                        className="bg-base-300 hover:bg-black hover:text-white p-3 font-semibold"
                      >
                        All Users
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="allproducts"
                        className="bg-base-300 hover:bg-black hover:text-white p-3 font-semibold"
                      >
                        All Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="adminsalessummary"
                        className="bg-base-300 hover:bg-black hover:text-white p-3 font-semibold"
                      >
                        Sales Summury
                      </Link>
                    </li>
                   
                  </>
                )}
                {userData.role === "manager" && (
                  <>
                    <li>
                      <Link
                        to="mystore"
                        className="bg-base-300 hover:bg-black hover:text-white p-3 font-semibold"
                      >
                        My Store
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="myproducts"
                        className="bg-base-300 hover:bg-black hover:text-white p-3 font-semibold"
                      >
                        My Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="salescollection"
                        className="bg-base-300 hover:bg-black hover:text-white p-3 font-semibold"
                      >
                        Sales Collection
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="checkout"
                        className="bg-base-300 hover:bg-black hover:text-white p-3 font-semibold"
                      >
                        Check Out
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="summary"
                        className="bg-base-300 hover:bg-black hover:text-white p-3 font-semibold"
                      >
                        Sales Summary
                      </Link>
                    </li>
                    
                    <li>
                      <Link
                        to="payment"
                        className="bg-base-300 hover:bg-black hover:text-white p-3 font-semibold"
                      >
                        Subscription & Payment
                      </Link>
                    </li>
                  </>
                )}
              </>
            )}

            {/* {userData && (
              <>
               
              </>
            )} */}
            <div className="divider py-3"></div>
            <li>
              <Link
                to="/"
                className="bg-base-300 hover:bg-black hover:text-white p-3 font-semibold"
              >
                Home
              </Link>
            </li>
            <li>
              <Link onClick={logOut} to="/" className="bg-red-500 text-white p-3 font-semibold">
                Log Out
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          {location.pathname === "/dashboard" && (
            <div className="text-center mt-10">
              <p className="text-3xl font-bold">
                Welcome to InventiSync Dashboard
              </p>
            </div>
          )}
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
