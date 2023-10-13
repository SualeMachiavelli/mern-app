import React, { useEffect, useReducer, useState } from "react";
import Star from "./Star";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { loadingInitialState, loadingReducer } from "./reducer";

const token =
  localStorage.getItem("user") &&
  JSON.parse(localStorage.getItem("user")).token;

const config = {
  headers: {
    "Content-Type": "application/json",
    token: "Bearer " + token,
  },
};

const ReviewsPage = () => {
  const [date, setDate] = useState(1);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, dispatch] = useReducer(loadingReducer, loadingInitialState);
  const { isLoading } = state;
  const color = "#4f177d";
  useEffect(() => {
    const getReviews = async () => {
      dispatch({ type: "start" });
      let info;
      try {
        if (date) {
          info = await axios.get(
            `http://localhost:8800/api/flowers/${id}/reviews?createdAt=${date}`,
            config
          );
        } else {
          info = await axios(
            `http://localhost:8800/api/flowers/${id}/reviews`,
            config
          );
        }
        setReviews(info.data.reviews);
        dispatch({ type: "success", payload: info.data.reviews });
        // setDate((d) => -d);
      } catch (err) {
        console.log(err.response.data.message);
        dispatch({ type: "error", payload: err.response.data.message });
      }
    };
    getReviews();
  }, [id, date]);

  const handleWriteReview = () => {
    navigate("/flowers/" + id + "/reviews");
  };

  const handleToggle = (e) => {
    // const asc = e.target.target.dataset.asc;
    // const dsc = e.target.target.dataset.dsc;

    e.target.querySelectorAll("option").forEach((o) => {
      if (o.dataset.asc) setDate(o.dataset.asc); //f = o.dataset.asc;
      if (o.dataset.dsc) setDate(o.dataset.dsc);
    });
  };

  const handleAsc = async () => {
    console.log("Clicked");
    try {
      const { data } = await axios.get(
        `http://localhost:8800/api/flowers/${id}/reviews?createdAt=${date}`,
        config
      );
      setReviews(data.reviews);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <>
      <div className="reviews">
        <div className="reviews__items">
          <ul>
            {/* <li className="reviews__item">
              <span>Sort by Date:</span>
              <select onToggle={handleToggle}>
                <option data-asc={1} onChange={handleAsc}>
                  Ascending
                </option>
                <option data-dsc={-1}>Descending</option>
              </select>
            </li> */}
            <li className="reviews__item">
              <span className="reviews__review" onClick={handleWriteReview}>
                Write a review
              </span>
            </li>
          </ul>
          <li className="reviews__item"></li>
        </div>
        <main className="reviews__main">
          {!isLoading ? (
            <div className="reviews__container">
              {reviews?.map((review, i) => (
                <div className="reviews__user" key={i}>
                  <div className="reviews__box">
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
                      alt=""
                    />
                    <div className="reviews__write">
                      <span className="reviews__ratings">
                        {Array.from({ length: review?.rating }, (_, i) => (
                          <Star key={i} color={color} />
                        ))}
                      </span>
                      <span className="reviews__date">{`${review?.createdAt}`}</span>
                    </div>
                  </div>
                  <p className="reviews__text">{review?.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="loading">Fetching reviews...</p>
          )}
        </main>
      </div>
      )
    </>
  );
};

export default ReviewsPage;
