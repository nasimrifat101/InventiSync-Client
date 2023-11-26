/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

const CartCard = ({ item }) => {
    const price = item.sellingPrice.toFixed(2);
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
            <h2 className="card-title">{item.name}</h2>
            <p>Price: {price}</p>
            <p>Quantity: {item.quantity}</p>
            <button className="btn btn-sm bg-base-300 hover:bg-green-300 hover:text-black">
                Get Paid
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CartCard;
  