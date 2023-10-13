import axios from "axios";
import React, { useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadingInitialState, loadingReducer } from "./reducer";
import { uploadReview } from "./productsApi";
import { useDispatch, useSelector } from "react-redux";
import Star from "./Star";
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : { user: null };
const { token } = user;

// console.log(token);

const config = {
  headers: {
    "Content-Type": "application/json",
    token: "Bearer " + token,
  },
};

const WriteReview = () => {
  const [tempRating, setTempRating] = useState(0);
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const navigate = useNavigate();
  const { flowerId } = useParams();
  const [comment, setComment] = useState("");
  const [alert, setAlert] = useState(false);
  // const [rating, setRating] = useState("");
  const [close, setClose] = useState(true);
  const [removeStatus, setRemoveStatus] = useState(true);
  const dispatch = useDispatch();
  const { fetching, error, status, errorStatus } = useSelector(
    (state) => state.product
  );

  const handleBack = () => {
    navigate("/");
  };

  const handleWriteReview = async (e) => {
    e.preventDefault();

    const info = {
      comment,
      rating,
    };

    const data = await uploadReview(dispatch, flowerId, info);

    console.log(alert);
    data?.status === "success" && setAlert(true);
    alert &&
      setTimeout(() => {
        setAlert(null);
      }, 1400);
  };

  alert &&
    setTimeout(() => {
      setClose(false);
      setTimeout(() => navigate("/"), 1500);
    }, 2000);

  return (
    <div className="write">
      <div className="write__bg"></div>
      <span className="write__close" onClick={handleBack}>
        &larr;
      </span>
      <div className="write__main">
        <h1>Flower Moments</h1>
        <h2>Your review will help us improve</h2>
        <form onSubmit={handleWriteReview}>
          <input
            required
            onChange={(e) => setComment(e.target.value)}
            type="text"
            name="comment"
            placeholder="write a review here"
          />
          {/* <input
            required
            type="number"
            onChange={(e) => setRating(e.target.value)}
            placeholder="write a rating here"
            max="5"
            min="2"
          /> */}

          <div className="write__stars">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                full={rating >= i + 1}
                onRate={() => handleRating(i + 1)}
                key={i}
                color={rating >= i + 1 ? "green" : "#000"}
                onMouseEnter={() => setTempRating(i + 1)}
                onMouseLeave={() => setTempRating(0)}
              />
            ))}
          </div>

          {error && <p className="message error">{error}</p>}

          {status && close && (
            <p className="message success">Review submitted</p>
          )}
          <button className="uploadFlower__btn">
            {fetching ? "submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteReview;
