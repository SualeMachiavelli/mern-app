import React, { useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const AddContact = ({ dispatch, orderdata, count }) => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [state, loadingDispatch] = useReducer(
    loadingReducer,
    loadingInitialState
  );
  const { error: loadingError, status, isLoading } = state;
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [close, setClose] = useState(true);
  const handleBack = () => {
    dispatch({ type: "content" });
  };
  const handleOrder = async () => {
    if (!contact) {
      setError(<p className="add__error">Please enter a reachable contact</p>);
    }
    const orderingItems = {
      contact,
      ...orderdata,
      flowerId: orderdata?._id,
      quantity: count,
      total: count * orderdata?.price,
    };
    loadingDispatch({ type: "start" });
    try {
      const data = await axios.post(
        "http://localhost:8800/api/orders",
        orderingItems,
        config
      );
      loadingDispatch({ type: "success", payload: data });
      loadingDispatch({ type: "status" });
    } catch (err) {
      loadingDispatch({ type: "error", payload: err.response.data.message });
      console.log(err.response.data.message);
    }
  };
  const handleFocus = () => {
    inputRef.current.focus();
  };

  status && setTimeout(() => setClose(false), 4000);

  status && setTimeout(() => navigate("/"), 6000);
  return (
    <div className="add flower__content">
      <span className="add__close" onClick={handleBack}>
        &larr;Back
      </span>
      <h2>Welcome to Flower Moments</h2>
      <p>
        You're ordering {count} <span>{orderdata?.name}</span> total of
        <strong> {orderdata?.price * count}ghc</strong>
      </p>
      <input
        type="tel"
        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
        ref={inputRef}
        onClick={handleFocus}
        placeholder="Enter reachable contact"
        onChange={(e) => setContact(e.target.value)}
      />
      {error && <p>{error}</p>}
      {status && close && (
        <p className="message success">Order has been placed</p>
      )}
      <button className="add__btn" onClick={handleOrder}>
        {isLoading ? "creating..." : "Proceed Order"}
      </button>
    </div>
  );
};

export default AddContact;
