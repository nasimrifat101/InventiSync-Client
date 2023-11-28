/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { jsPDF } from "jspdf";
import { ToastContainer, toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const CartCard = ({ item, refetch }) => {
  const price = item.sellingPrice.toFixed(2);
  const axiosSecure = useAxiosSecure();

  // get current date and time
  const productAddedDate = new Date();
  const year = productAddedDate.getFullYear();
  const month = productAddedDate.getMonth() + 1; // Months are zero-based, so we add 1
  const day = productAddedDate.getDate();

  // Extract time components
  const hours = productAddedDate.getHours();
  const minutes = productAddedDate.getMinutes();
  const seconds = productAddedDate.getSeconds();

  // Create separate date and time strings
  const dateStr = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  const timeStr = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const sale = {
    ...item, // include properties from the item object
    dateStr,
    timeStr,
  };
  const saleWithoutId = (({ _id, ...rest }) => rest)(sale);

  const handleGetPaid = (id) => {
    // delete from cart

    axiosSecure
      .delete(`/cart/delete/${id}`)
      .then((deleteRes) => {
        console.log(deleteRes.data);
        toast.success("Payment processing");
        refetch();

        // add to sales collection
        axiosSecure
          .post("/sales", saleWithoutId)
          .then((salesRes) => {
            console.log(salesRes.data);

            if (salesRes.data.insertedId) {
              toast.success("Added to sales");

              // Use a Promise.all to run update operations concurrently
              Promise.all([
                // increase sales count
                axiosSecure.put(`/product/increase-sales-count/${id}`),
                // minus quantity
                axiosSecure.put(`/product/decrease-quantity/${id}`),
              ])
                .then(([salesCountRes, quantityRes]) => {
                  if (
                    salesCountRes.data.modifiedCount > 0 &&
                    quantityRes.data.modifiedCount > 0
                  ) {
                    toast.success("Sales Count and Quantity Updated");
                    generatePDF();
                  } else {
                    toast.error("Failed to update Sales Count or Quantity");
                  }
                })
                .catch((error) => {
                  toast.error("Error updating Sales Count or Quantity");
                });
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error("Error adding to sales");
          });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error processing payment");
      });
  };

  const generatePDF = () => {
    const pdfDoc = new jsPDF();
    const {
      name,

      discount,
      shopId,
      shopName,
      owner,
      OwnerEmail,
      sellingPrice,
    } = item;
    const headerFontSize = 18;
    const subheaderFontSize = 14;
    const normalFontSize = 12;
    const lineHeight = 8;

    pdfDoc.setFontSize(headerFontSize);
    pdfDoc.text("Invoice", 10, 15);

    pdfDoc.setFontSize(subheaderFontSize);
    pdfDoc.text("Store Details", 10, 25);
    pdfDoc.setFontSize(normalFontSize);
    pdfDoc.text(`Shop ID: ${shopId}`, 10, 35);
    pdfDoc.text(`Shop Name: ${shopName}`, 10, 45);
    pdfDoc.text(`Owner: ${owner}`, 10, 55);
    pdfDoc.text(`Email: ${OwnerEmail}`, 10, 65);
    pdfDoc.setFontSize(subheaderFontSize);
    pdfDoc.text("Sales Details", 10, 125);
    pdfDoc.setFontSize(normalFontSize);
    pdfDoc.text(`Product Name: ${name}`, 10, 135);
    pdfDoc.text(`Selling Price: $${sellingPrice}`, 10, 145);
    pdfDoc.text(`Discount: $${discount}`, 10, 175);
    pdfDoc.save("invoice.pdf");
  };

  return (
    <div>
      <div className="card card-compact w-52 bg-base-200 hover:shadow-xl">
        <figure>
          <img
            src={item.logo}
            className="h-40 p-3 rounded-3xl"
            alt={item.name}
          />
        </figure>
        <div className="card-body">
          <h2 className="">{item.name}</h2>
          <p>Price: {price}</p>
          <p>Quantity: {item.quantity}</p>
          <button
            onClick={() => handleGetPaid(item._id)}
            className="btn btn-sm bg-base-300 hover:bg-green-300 hover:text-black"
          >
            Get Paid
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CartCard;
