import { useState } from "react";
import LoadingPage from "../../ErrorPages/LoadingPage";
import useProducts from "../../../Hooks/useProducts";
import { Helmet } from "react-helmet-async";
import DashNavSecond from "../extra/DashNavSecond";

const AdminAllProducts = () => {
  const { products, isLoading } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // You can adjust this based on your preferences

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products
    ? products.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
        <Helmet><title>InventiSync | D | All Products</title></Helmet>
    <DashNavSecond heading={'All Products'}></DashNavSecond>
      {isLoading ? (
        <LoadingPage></LoadingPage>
      ) : (

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Shop Name</th>
                <th>Owner Email</th>
                <th>Sale Count</th>
               
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {currentProducts.map((item) => (
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

                  {item.shopName ? (
                    <td className="font-semibold">{item.shopName} </td>
                  ) : (
                    <td>N/A</td>
                  )}

                  <td>
                    <div className="font-semibold">{item.OwnerEmail}</div>
                  </td>

                  {item.salesCount ? (
                    <td className="font-semibold">{item.salesCount}</td>
                  ) : (
                    <td>N/A</td>
                  )}

                  
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <ul className="pagination text-center flex justify-center mt-4">
            {Array.from({
              length: Math.ceil(products.length / itemsPerPage),
            }).map((_, index) => (
              <li key={index} className="page-item ">
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link btn bg-base-200"
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminAllProducts;
