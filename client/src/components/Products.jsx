import React from "react";
import Star from "./Star";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

const Products = (props) => {
  const {
    flowersData,
    page,
    count,
    limit,
    onSetLimit,
    onSetPage,
    onRemainder,
    onCount,
    onSetRemainder,
    onSetResult,
    onResult,
  } = props;
  const { flowers } = flowersData;
  const navigate = useNavigate();

  const pageRemainder = Math.floor(onResult / limit) + 1;
  const fakePage = page + 1;

  const handleDetails = async (e) => {
    let flowerId = e.target.dataset.flowerId;
    let flowerCount = e.target.dataset.flowerCount;
    // const res = await fetch("http://localhost:8800/api/flowers/" + flowerId);
    // const data = await res.json();

    navigate(`/flowers/${flowerId}`, { state: flowers[flowerCount] });
    // for (let i = 0; i <= flowers.length; i++) {
    //   if ()
    //   if (flowerId !== flowers[i]?._id) return;

    //   if (flowerId === flowers[i]?._id)
    //     navigate(`/flowers/${flowerId}`, { state: flowers[flowerCount] });
    // }
  };

  const handleNext = () => {
    // console.log("Next");
    fakePage < pageRemainder && onSetPage((p) => p + 1);
  };
  const handlePrevious = () => {
    fakePage >= pageRemainder && onSetPage((p) => p - 1);
    // console.log(fakePage, pageRemainder);
    // console.log("Previous");
  };
  // console.log(fakePage, pageRemainder);
  const desc = "hdjdjjdhdjhdhjeiikdjoeoe";
  // const desc1 = flowers && flowers[2].description.padStart(-4);

  return (
    <>
      <div className="products">
        <h2>Featured flowers, search by name:</h2>

        <div className="products__container">
          {flowers?.map((flower, i) => (
            <div key={i} className="products__single">
              <img
                className="products__photo"
                src={`/${flower?.images[0]?.filePath}`}
                alt={flower.name}
              />
              <div className="products__items">
                <div className="products__ratings">
                  <div>
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>
                  <span className="products__rating">3.8</span>
                </div>
                <span className="products__name">{flower.name}</span>
                <span className="products__summary">{flower.description}</span>
                <button
                  onClick={handleDetails}
                  data-flower-id={flower._id}
                  data-flower-count={i}
                  className="btn products__btn"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
