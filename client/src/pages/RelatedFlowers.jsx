import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { homeData } from "./data";
import Star from "./Star";
import axios from "axios";
import { loadingInitialState, loadingReducer } from "./reducer";

const RelatedFlowers = ({ type }) => {
  const navigate = useNavigate();
  const { id: flowerId } = useParams();
  const { id: cardId } = useParams();
  const [data, setData] = useState([]);
  const [state, dispatch] = useReducer(loadingReducer, loadingInitialState);
  const { isLoading, error } = state;

  useEffect(() => {
    const getFlowers = async () => {
      let info;
      try {
        dispatch({ type: "start" });
        if (type === "flower") {
          info = await axios(
            "http://localhost:8800/api/flowers/" + flowerId + "/related"
          );
        } else if (type === "card") {
          info = await axios(
            "http://localhost:8800/api/cards/" + cardId + "/related"
          );
        }
        const { flowers: fdata } = info.data;
        const { cards: cdata } = info.data;
        fdata && setData(fdata);
        cdata && setData(cdata);
        dispatch({ type: "success", payload: fdata });
        // setFlowers(fdata);
      } catch (err) {
        console.log(err.response.data.message);
        dispatch({ type: "error", payload: err.response.data.message });
      }
    };
    getFlowers();
  }, [flowerId, cardId, type]);

  const handleView = (e) => {
    const flowerId = e.target.dataset.flowerId;
    const slug = e.target.dataset.flowerIid;
    navigate(`/flowers/${flowerId}`, { state: data[slug] });
  };

  const starColor = "#39ce95";
  return (
    <section className="related">
      <main className="related__main">
        <p className="related__title">
          Related {type === "card" ? "Gift Card" : type}s by their type
        </p>
        {isLoading ? (
          <p className="loading">Fetching...</p>
        ) : (
          <div className="related__container">
            {data?.map((info, i) => (
              <div key={i} className="related__single">
                <img
                  className="related__photo"
                  src={`/${info?.photos[0]?.filePath}`}
                  alt={info?.title}
                />
                <div className="related__items">
                  <div className="related__ratings">
                    <div>
                      <Star color={starColor} />
                      <Star color={starColor} />
                      <Star color={starColor} />
                      <Star color={starColor} />
                    </div>
                    <span className="related__rating">3.8</span>
                  </div>
                  <span className="related__name">{info?.name}</span>
                  <span className="related__price">{info?.price}ghc</span>
                  {/* <span className="related__summary">{info.desc}</span> */}
                  <button
                    className="btn related__btn"
                    data-flower-id={info?._id}
                    data-flower-iid={i}
                    onClick={handleView}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </section>
  );
};

export default RelatedFlowers;
