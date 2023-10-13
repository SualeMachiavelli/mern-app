import React, { useEffect, useState } from "react";
// import { homeData } from "./data";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFailure,
  fetchStart,
  fetchSuccess,
} from "./store/productsReducer";

const token =
  localStorage.getItem("user") &&
  JSON.parse(localStorage.getItem("user")).token;

const config = {
  headers: {
    "Content-Type": "application/json",
    token: "Bearer " + token,
  },
};

const Home = () => {
  const [cPhoto, cSetPhoto] = useState(0);
  const [cQuote, cSetQuote] = useState(0);
  const [cTitle, cSetTitle] = useState(0);
  // const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const { fetching, error } = useSelector((state) => state.product);

  const [quotes, setQuotes] = useState([]);
  const [titles, setTitles] = useState([]);
  const [photos, setPhotos] = useState([]);

  const photoLength = photos?.length - 1;
  const quoteLength = quotes?.length - 1;
  const titleLength = titles?.length - 1;

  useEffect(() => {
    const getHome = async () => {
      dispatch(fetchStart());
      setTimeout(() => {
        cPhoto <= photoLength && cSetPhoto((c) => c + 1);
        cPhoto >= photoLength && cSetPhoto(0);
        cQuote <= quoteLength && cSetQuote((c) => c + 1);
        cQuote >= quoteLength && cSetQuote(0);
        cTitle <= titleLength && cSetTitle((c) => c + 1);
        cTitle >= titleLength && cSetTitle(0);
      }, 5000);
      try {
        const { data: homeData } = await axios.get(
          "http://localhost:8800/api/flowers/home",
          config
        );
        // console.log(res.data);
        const { home } = homeData;
        dispatch(fetchSuccess(home));
        setQuotes(home[0]?.quotes[0]?.split(";"));
        setTitles(home[0]?.titles[0]?.split(";"));
        setPhotos(home[0]?.photos);
      } catch (err) {
        dispatch(fetchFailure(err?.response?.data?.message));
      }
    };
    getHome();
  }, [cPhoto, photoLength, cQuote, quoteLength, cTitle, titleLength, dispatch]);

  return (
    <>
      <section className="home" id="home">
        <div className="home__bg"></div>
        <div className="home__container">
          <img
            src={`/${photos[cPhoto]?.filePath}`}
            alt="image_name"
            className="home__photo"
          />
          <div className="home__content">
            <p>
              <span className="home__q1"></span>
              {titles[cTitle]}
              <span className="home__q2"></span>
            </p>
            <h1>~{quotes[cQuote]}</h1>

            <button className="btn home__btn">Learn more</button>
          </div>
          <div className="home__active-box">
            {photos.map((_, i) => (
              <span
                key={i}
                className={`home__dot ${cQuote === i ? "active" : ""}`}
              ></span>
            ))}
          </div>
        </div>
        {/* {fetching && <p className="loading home__loading">Loading home info</p>} */}
      </section>
    </>
  );
};

export default Home;
