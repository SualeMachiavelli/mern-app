import React, { useState } from "react";
import Star from "./Star";
import { createOrder } from "../ApiFetch";
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : { user: null };

console.log(user.user._id);

const ProdDescription = ({ state }) => {
  const [count, setCount] = useState(1);
  const handleOrder = async () => {
    const orderItems = {
      user: user?.user._id,
      id: state._id,
      name: state.name,
      price: state.price,
      total: state.price * count,
      images: state.images,
      quantity: count,
      contact: state.contact,
    };
    // console.log(orderItems);
    await createOrder(orderItems);
  };

  const handleAdd = () => {
    count > 0 && setCount((c) => c + 1);
  };
  const handleSub = () => {
    count > 1 && setCount((c) => c - 1);
  };

  return (
    <div className="product__details">
      <div className="product__images-box">
        {state?.images?.map((image, i) => (
          <img
            key={i}
            src={`/${image.filePath}`}
            alt={image}
            className="product__images-list"
          />
        ))}
      </div>
      <p className="product__description">{state.name}</p>
      <p className="product__description">{state.description}</p>
      <span className="product__price">
        {state.price}Ghc <span className="product__times"> X {count}</span>
      </span>
      <span className="product__star">
        <Star />
        <Star />
        <Star />
        <Star />
      </span>
      <div className="product__btn-box">
        <button className="product__sub btn" onClick={handleSub}>
          -
        </button>
        <button className="product__add btn" onClick={handleAdd}>
          +
        </button>
      </div>
      <button className="product__btn btn" onClick={handleOrder}>
        place an order
      </button>
    </div>
  );
};

export default ProdDescription;
