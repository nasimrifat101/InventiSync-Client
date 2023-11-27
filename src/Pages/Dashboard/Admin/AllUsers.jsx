/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import useAxiosNormal from "../../../Hooks/useAxiosNormal";
import { ToastContainer, toast } from "react-toastify";
import EmailModal from "../extra/EmailModal";
import DashNav from "../../../Layout/Dashboard/DashNav";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import LoadingPage from "../../ErrorPages/LoadingPage";

const AllUsers = () => {
  const axiosNormal = useAxiosNormal();
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [isloading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("/users", {
        headers: {
          authorization: `Bearer${localStorage.getItem("access-token")}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, [axiosSecure]);

  const openModal = (email) => {
    setSelectedEmail(email);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEmail("");
  };

  const sendEmail = async (to, subject, text) => {
    try {
      await axiosNormal.post("/send-email", {
        to,
        subject,
        text,
      });
      toast.success("Email sent successfully");
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.warn("Failed to send email. Please try again later.");
    }
  };

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Helmet>
        <title>InventiSync | D | All Users</title>
      </Helmet>
      <DashNav total={users.length} heading="Total Users"></DashNav>
      {isloading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Shop Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {currentUsers.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.profile}
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
                    <div className="font-semibold">{item.email}</div>
                  </td>

                  {item.role ? (
                    <td className="font-semibold">{item.role}</td>
                  ) : (
                    <td>N/A</td>
                  )}

                  <td>
                    <button
                      onClick={() => openModal(item.email)}
                      className="btn"
                    >
                      Send Email
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
           {/* Pagination */}
           <ul className="pagination text-center flex justify-center mt-4">
            {Array.from({ length: Math.ceil(users.length / itemsPerPage) }).map(
              (_, index) => (
                <li key={index} className="page-item ">
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link btn bg-base-200"
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      )}
      <EmailModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        onSend={(subject, body) => sendEmail(selectedEmail, subject, body)}
      />
      <ToastContainer />
    </div>
  );
};

export default AllUsers;
