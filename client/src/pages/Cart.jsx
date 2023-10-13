import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadingInitialState, loadingReducer } from "./reducer";
import { checkAndAddToCart } from "./productsApi";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem } from "./cartAPI";
import ContactInfo from "./ContactInfo";

const userInfo =
  localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

const config = {
  headers: {
    "Content-Type": "application/json",
    token: "Bearer " + userInfo?.token,
  },
};

const Cart = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [q, setQ] = useState(null);
  const [contact, setContact] = useState(false);
  const [state, dispatch] = useReducer(loadingReducer, loadingInitialState);
  const { isLoading, error } = state;

  const dispatcher = useDispatch();

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const getCartdItems = async () => {
      dispatch({ type: "start" });
      try {
        const data = await axios(
          `http://localhost:8800/api/cards/carts?user=${userInfo.user._id}`,
          config
        );

        setData(data?.data?.carts);
        dispatch({ type: "success" });
      } catch (err) {
        dispatch({ type: "error" });
        console.log(err.response.data.message);
      }
    };
    getCartdItems();
  }, []);

  let sum = 0;
  // let q = 0;
  for (let i = 0; i < data?.length; i++) {
    sum += data[i]?.total;
    // q += data[i]?.quantity;
  }

  const handleQuantity = async (e) => {
    let quantity = Number(e.target.dataset.quantity)
      ? Number(e.target.dataset.quantity)
      : q;
    const cartId = e.target.dataset.id;
    const price = Number(e.target.dataset.price);
    const iden = Number(e.target.dataset.identifier);

    const updatedItem = {
      quantity: q,
      total: q * price,
    };

    console.log(updatedItem);

    const info = await checkAndAddToCart(
      dispatcher,
      "/api/carts/" + cartId,
      updatedItem
    );
    console.log(info);
  };

  const handleRemoveCartItem = async (e) => {
    const cartId = e.target.dataset.cartId;
    await removeCartItem(cartId);
    setTimeout(() => window.location.assign("/cart"), 1500);
  };

  return (
    <div className="cart">
      {isLoading ? (
        <p className="loading center">Fetching...</p>
      ) : (
        data?.length >= 1 && (
          <div className="cart__main">
            <span className="cart__close" onClick={handleBack}>
              &larr;
            </span>
            <div className="cart__table">
              <span className="cart__name-t">Item</span>
              <span className="cart__price-t">Price</span>
              <span className="cart__quantity-t">Quantity</span>
              <span className="cart__total-t">Subtotal</span>
            </div>
            {data?.map((cart, i) => (
              <li className="cart__item" key={i}>
                <div className="cart__info">
                  <img src={`/${cart?.photo?.filePath}`} alt={cart._id} />
                  <span className="cart__name">{cart?.name}</span>
                  <span className="cart__price">{cart?.price}</span>
                  <span className="cart__quantity">{cart?.quantity}</span>
                  <span className="cart__total">
                    {parseFloat(cart?.total).toFixed(2)}Ghc
                  </span>
                  <button
                    className="cart__delete"
                    onClick={handleRemoveCartItem}
                    data-cart-id={cart._id}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}

            <div className="cart__summary">
              <li className="cart__sitem">
                <span>Subtotal</span>
                <span>{parseFloat(sum).toFixed(2)}Ghc</span>
              </li>
              <li className="cart__sitem cart__stotal">
                <span>Total</span>
                <span>{parseFloat(sum).toFixed(2)}Ghc</span>
              </li>
              <button
                className="cart__btn"
                onClick={() => setContact((s) => !s)}
              >
                contact
              </button>
            </div>
            {contact && <ContactInfo />}
          </div>
        )
      )}
      {!data?.length && !isLoading && (
        <p className="cart__message">Not added to cart yet</p>
      )}
    </div>
  );
};

export default Cart;
