import React, { useReducer, useState } from "react";
import Star from "./Star";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { addToCart, getProduct } from "./productsApi";
import { useDispatch, useSelector } from "react-redux";

const userInfo =
  localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

const config = {
  headers: {
    "Content-Type": "application/json",
    token: "Bearer " + userInfo?.token,
  },
};

const Card = ({ info, data, iCount }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  // const { error, status, fetching } = useSelector((state) => state.product);

  const [card, setCard] = useState({});
  const [close, setClose] = useState(true);

  const handle = (e) => {
    const cardId = e.target.dataset.cardId;

    navigate(`/giftcards/${cardId}`, { state: data[iCount] });
  };

  const handleAddToCart = async (e) => {
    const dataId = e.target.dataset.dataId;
    const dataType = e.target.dataset.dataType;

    const data = await getProduct(
      dispatch,
      `http://localhost:8800/api/${dataType}s/${dataId}`
    );
    let items;

    if (dataType === data.card.type) {
      items = {
        cardId: data.card._id,
        type: data.card.type,
        name: data.card.name,
        price: data.card.price,
        photo: data.card?.photos[0],
        quantity: 1,
        total: data.card.price,
        user: userInfo._id,
      };
    } else if (dataType === data.flower.type) {
      items = {
        cardId: data.flower._id,
        type: data.flower.type,
        name: data.flower.name,
        price: data.flower.price,
        photo: data.flower?.photos[0],
        quantity: 1,
        total: data.card.price,
        user: userInfo._id,
      };
    }

    const info = await addToCart(
      dispatch,
      `http://localhost:8800/api/${dataType}s/${dataId}`,
      items
    );

    if (info.status === "success") {
      setStatus(info.status === "success");
    }

    info.status && setTimeout(() => setStatus(false), 2500);
  };

  // status && setTimeout(() => setClose(false), 2500);

  return (
    <div className="gift__main">
      <div className="gift__card">
        <img
          className="gift__img"
          src={`/${info?.photos[0].filePath}`}
          alt="imgd"
        />
        <div className="gift__items">
          <span className="top">Gift card</span>
          <span className="gift__ratings">
            {/* <Star />
            <Star />
            <Star /> */}
          </span>
          <span className="gift__name">{info?.name?.toUpperCase()}</span>
          <span className="gift__price">{info?.price}ghc</span>
          <div className="gift__box">
            <button
              className="gift__btn"
              data-data-id={info?._id}
              data-card-id={info?._id}
              onClick={handle}
            >
              View
            </button>
            {/* {error && <p className="message error">{error}</p>} */}
            {status && (
              <p className="message success">{info?.name} added to cart</p>
            )}

            {/* <button
              onClick={handleAddToCart}
              className="gift__btn gift__addToCart"
              data-data-id={info._id}
              data-data-type={info.type}
            >
              Add to Cart
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
