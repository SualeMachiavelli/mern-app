import React, { useEffect, useState } from "react";
import Star from "./Star";
import { useNavigate, useParams } from "react-router-dom";

const RelatedProducts = ({ state }) => {
  const [relatedFlowers, setRelatedFlowers] = useState([]);
  const { flowerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getRelatedFlowers = async () => {
      try {
        const res = await fetch(
          `http://localhost:8800/api/flowers/${flowerId}/related`
        );
        const { flowers } = await res.json();

        setRelatedFlowers(flowers);
      } catch (error) {
        console.log(error);
      }
    };
    getRelatedFlowers();
  }, [flowerId]);

  const handleDetails = async (e) => {
    let flowerId = e.target.dataset.flowerId;
    let flowerCount = e.target.dataset.flowerCount;
    // const res = await fetch("http://localhost:8800/api/flowers/" + flowerId);
    // const data = await res.json();

    navigate(`/flowers/${flowerId}`, { state: relatedFlowers[flowerCount] });
    // for (let i = 0; i <= flowers.length; i++) {
    //   if ()
    //   if (flowerId !== flowers[i]?._id) return;

    //   if (flowerId === flowers[i]?._id)
    //     navigate(`/flowers/${flowerId}`, { state: flowers[flowerCount] });
    // }
  };

  return (
    <div className="related_products">
      <h2>Related related_products by name:</h2>
      <div className="related_products__container">
        {relatedFlowers?.map((flower, i) => (
          <div key={i} className="related_products__single">
            <img
              className="related_products__photo"
              src={`/${flower.images[0].filePath}`}
              alt={flower.name}
            />
            <div className="related_products__items">
              <div className="related_products__ratings">
                <div>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
                <span className="related_products__rating">3.8</span>
              </div>
              <span className="related_products__name">{flower.name}</span>
              <span className="related_products__summary">
                {flower.description}
              </span>
              <button
                data-flower-id={flower._id}
                data-flower-count={i}
                className="btn related_products__btn"
                onClick={handleDetails}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
