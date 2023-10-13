import React, { useEffect, useReducer, useState } from "react";
import Star from "../Star";
import axios from "axios";

const user =
  localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

const config = {
  headers: {
    "Content-Type": "application/json",
    token: "Bearer " + user?.token,
  },
};

const Products = ({ products, onDelete }) => {
  const starColor = "#000";
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data: fdata } = await axios(
          "http://localhost:8800/api/flowers",
          config
        );
        const { data: cdata } = await axios(
          "http://localhost:8800/api/cards",
          config
        );
        if (cdata || fdata) setData(fdata.flowers.concat(cdata.cards));
        // console.log(fdata.flowers.concat(cdata.cards));
        // console.log(...fdata.flowers, ...cdata.cards);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    getData();
  }, []);

  return (
    <div className="products">
      {data.length >= 1 ? (
        <div className="products__container">
          {data?.map((info, i) => (
            <div key={i} className="products__single">
              <img
                className="products__photo"
                src={info?.photos[0]?.filePath}
                alt={info?.name}
              />
              <div className="products__items">
                <div className="products__ratings">
                  <div>
                    <Star color={starColor} />
                    <Star color={starColor} />
                    <Star color={starColor} />
                    <Star color={starColor} />
                  </div>
                  <span className="products__rating">3.8</span>
                </div>
                <span className="products__name">{info?.name}</span>
                <span className="products__price">Ghc{info?.price}</span>
                <div className="products__btns">
                  {/* <button
                    className="products__btn"
                    data-flower-iid={i}
                    data-card-iid={i}
                  >
                    View
                  </button> */}
                  <button
                    onClick={onDelete}
                    className="products__btn products__delete"
                    data-p-type={info?.type}
                    data-p-id={info._id}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="products__message">No products</p>
      )}
    </div>
  );
};

export default Products;
