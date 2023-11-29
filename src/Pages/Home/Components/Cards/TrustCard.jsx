/* eslint-disable react/prop-types */
import Rating from 'react-rating';
import { FaStar as StarOutline, FaStar as StarSolid } from 'react-icons/fa';

const TrustCard = ({ item }) => {
  const { title, testimonial, date, rating, company } = item;

  return (
    <div>
      <div className="card bg-base-100 text-white w-72 mr-5 h-[340px] border border-black shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{company}</p>
          <Rating
            initialRating={rating}
            emptySymbol={<StarOutline style={{ color: 'black' }} />}
            fullSymbol={<StarSolid style={{ color: 'red' }} />}
            readonly
          />

          <p>{testimonial}</p>
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
};

export default TrustCard;
