/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const SellingCard = ({ item }) => {
  const { img, title, info } = item;
  return (
    <div>
      <div className="card text-base-300 border border-black hover:shadow-xl">
        <div className="card-body">
          <h2 className="font-black">{title}</h2>
          <p>{info}</p>
        </div>
      </div>
    </div>
  );
};

export default SellingCard;
