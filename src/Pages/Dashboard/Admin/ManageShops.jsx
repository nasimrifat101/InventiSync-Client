import { useEffect, useState } from "react";
// import useAxiosNormal from "../../Hooks/useAxiosNormal";
import DashNav from "../../../Layout/Dashboard/DashNav";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import LoadingPage from "../../ErrorPages/LoadingPage";

const ManageShops = () => {
  //   const axiosNormal = useAxiosNormal();
  const axiosSecure = useAxiosSecure();
  const [shops, setShops] = useState([]);
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosSecure.get("/shops").then((res) => {
      setShops(res.data);
      setLoading(false);
    });
  }, [axiosSecure]);

  return (
    <div>
      <Helmet>
        <title>InventiSync | D | Manage Shops</title>
      </Helmet>
      <DashNav total={shops.length} heading={"Total Shops"}></DashNav>
      {isloading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Shop Name</th>
                <th>Product Limit</th>
                <th>Category</th>
                <th>Role</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {shops.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.logo}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.name}</div>
                      </div>
                    </div>
                  </td>

                  <td className="font-semibold">{item.productLimit} </td>

                  <td>
                    <div className="font-semibold">{item.category}</div>
                  </td>

                  <td className="font-semibold">{item.info}</td>

                  <td>
                    <button className="btn">Send Email</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageShops;
