import React from "react";
import Star from "./Star";
import Card from "./Card";
const GiftCard = () => {
  return (
    <div className="gift">
      <div className="gift__container">
        {/* <Card /> */}
        <div className="gift__card">
          <img
            src="https://media.istockphoto.com/id/1280934412/photo/gift-cards-with-blue-colored-bow.webp?b=1&s=170667a&w=0&k=20&c=5EjjFJf1gppmYVP7hcB38G7GZolZKfDTNX1gMjYSs9I="
            alt="imgd"
          />
          <div className="gift__items">
            <span className="gift__top">High Rating</span>
            <span className="gift__ratings">
              <Star />
              <Star />
            </span>
            <span className="gift__name">Jumpo gift card</span>
            <span className="gift__price">89ghc</span>
            <div className="gift__box">
              <button className="gift__btn"> View</button>
              <button className="gift__btn gift__addToCart">Add to Cart</button>
            </div>
          </div>
        </div>
        <div className="gift__card">
          <img
            src="https://images.unsplash.com/photo-1549116917-bccf55924737?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdpZnQlMjBjYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
            alt="imgd"
          />
          <div className="gift__items">
            <span className="gift__ratings">
              <Star />
              <Star />
              <Star />
              <Star />
            </span>
            <span className="gift__name"> gift card</span>
            <span className="gift__price">100ghc</span>
            <div className="gift__box">
              <button className="gift__btn"> View</button>
              <button className="gift__btn gift__addToCart">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
