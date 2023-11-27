import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import DashNavSecond from "../extra/DashNavSecond";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import LoadingPage from "../../ErrorPages/LoadingPage";

const SalesSummary = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [salesData, setSalesData] = useState({
    soldProduct: 0,
    totalSale: 0,
    totalInvest: 0,
    totalProfit: 0,
    salesHistory: [],
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  useEffect(() => {
    axiosSecure
      .get(`/sales-summary/${user.email}`)
      .then((response) => {
        const {
          soldProduct,
          totalSale,
          totalInvest,
          totalProfit,
          salesHistory,
        } = response.data;
        setSalesData({
          soldProduct,
          totalSale,
          totalInvest,
          totalProfit,
          salesHistory,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [axiosSecure, user.email]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSalesHistory = salesData.salesHistory.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Helmet>
        <title>InventiSync | D | Sales Summary</title>
      </Helmet>
      <DashNavSecond heading={"Get your sales summary here"} />

      <div className="container mx-auto mt-8 px-4">
        {loading ? (
          <LoadingPage></LoadingPage>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Sold Products Card */}
            <div className="p-4 bg-base-200 shadow-md rounded-md">
              <h2 className="text-xl font-semibold mb-2">Sold Products</h2>
              <p className="text-2xl font-bold">{salesData.soldProduct}</p>
            </div>

            {/* Total Sale Card */}
            <div className="p-4 bg-base-200 shadow-md rounded-md">
              <h2 className="text-xl font-semibold mb-2">Total Sale</h2>
              <p className="text-2xl font-bold">{salesData.totalSale}</p>
            </div>

            {/* Total Invest Card */}
            <div className="p-4 bg-base-200 shadow-md rounded-md">
              <h2 className="text-xl font-semibold mb-2">Total Invest</h2>
              <p className="text-2xl font-bold">{salesData.totalInvest}</p>
            </div>

            {/* Total Profit Card */}
            <div className="p-4 bg-base-200 shadow-md rounded-md">
              <h2 className="text-xl font-semibold mb-2">Total Profit</h2>
              <p className="text-2xl font-bold">{salesData.totalProfit}</p>
            </div>
          </div>
        )}

        {/* Sales History Table */}
        {!loading && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Sales History</h2>
            <table className="min-w-full bg-base-200 border border-gray-200">
              {/* Table headers */}
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Product Name</th>
                  <th className="py-2 px-4 border-b">Selling Date</th>
                  <th className="py-2 px-4 border-b">Profit</th>
                </tr>
              </thead>

              {/* Table body */}
              <tbody className="bg-base-200">
                {currentSalesHistory.map((sale) => (
                  <tr key={sale._id}>
                    <td className="py-2 px-4 border-b">{sale.name}</td>
                    <td className="py-2 px-4 border-b">{sale.dateStr}</td>
                    <td className="py-2 px-4 border-b">{sale.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <ul className="flex justify-center mt-4">
              {Array.from({
                length: Math.ceil(salesData.salesHistory.length / itemsPerPage),
              }).map((item, index) => (
                <li
                  key={index}
                  className={`mx-1 px-3 py-2 border rounded ${
                    currentPage === index + 1
                      ? "bg-primary text-white"
                      : "bg-base-200"
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesSummary;
