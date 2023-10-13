import React, { useState } from "react";
import Star from "./Star";

const Ratings = () => {
  const [tempRating, setTempRating] = useState(0);
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };
  return (
    <div className="rate">
      {Array.from({ length: 10 }, (_, i) => (
        <Star
          full={rating >= i + 1}
          onRate={() => handleRating(i + 1)}
          key={i}
          color={rating >= i + 1 ? "green" : "#000"}
          onMouseEnter={() => setTempRating(i + 1)}
          onMouseLeave={() => setTempRating(0)}
        />
      ))}
      <p>{tempRating ? tempRating : rating || rating || ""}</p>
      {/* <Rating />  */}
    </div>
  );
};

export default Ratings;
