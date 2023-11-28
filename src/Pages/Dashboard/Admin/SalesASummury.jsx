// SalesSummary.js
import { useState } from "react";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import LoadingPage from "../../ErrorPages/LoadingPage";

const SalesSummary = () => {
  const [summaryData, setSummaryData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [isLoading, setLoading] = useState(true);

  axiosSecure.get("/sales-view").then((res) => {
    setLoading(true);
    setSummaryData(res.data);
    setLoading(false);
  });

  return (
    <>
      {isLoading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <div className="container mx-auto mt-8 p-4">
          <h2 className="text-3xl font-semibold mb-4">Sales View</h2>

          <div className="flex justify-between space-x-4">
            {/* Card 2: Total Product */}
            <div className="p-4 bg-base-200 rounded-md flex-1">
              <h3 className="text-xl font-semibold mb-2">Total Product</h3>
              <p className="text-2xl">{summaryData.totalProduct}</p>
            </div>

            {/* Card 3: Total Sales */}
            <div className="p-4 bg-base-200 rounded-md flex-1">
              <h3 className="text-xl font-semibold mb-2">Total Sales</h3>
              <p className="text-2xl">{summaryData.totalSales}</p>
            </div>

            {/* Card 1: Total Income */}
            <div className="p-4 bg-base-200 rounded-md flex-1">
              <h3 className="text-xl font-semibold mb-2">Total Income</h3>
              <p className="text-2xl">${summaryData.totalIncome}</p>
            </div>
          </div>

          {/* Table: Sold Products */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Sold Products</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-base-200">
                  <th className="border-b p-2">Customer Name</th>
                  <th className="border-b p-2">Customer Email</th>
                  <th className="border-b p-2">Product Name</th>
                  <th className="border-b p-2">Selling Date</th>
                  <th className="border-b p-2">Profit</th>
                </tr>
              </thead>
              <tbody>
                {summaryData?.soldProducts?.map((product) => (
                  <tr key={product._id}>
                    <td className="border-b p-2">{product.name}</td>
                    <td className="border-b p-2">{product.email}</td>
                    <td className="border-b p-2">{product.service}</td>
                    <td className="border-b p-2">
                      {new Date(product.date).toLocaleDateString()}
                    </td>
                    <td className="border-b p-2">${product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default SalesSummary;
