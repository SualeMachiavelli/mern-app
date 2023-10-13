import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FakeSlider = () => {
  const [input, setInput] = useState(1);
  const navigate = useNavigate();
  const handleInput = (e) => {
    navigate("/home", { state: input });
    console.log(typeof input);
  };
  return (
    <div className="slider__message">
      <input
        className="slider__minput"
        onChange={(e) => setInput(Number(e.target.value))}
        type="number"
        placeholder="Enter the number of quotes and photos to upload"
      />
      <button className="slider__mbtn" onClick={handleInput}>
        continue
      </button>
    </div>
  );
};

export default FakeSlider;
