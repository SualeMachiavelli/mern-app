import axios from "axios";
import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadingInitialState, loadingReducer } from "./reducer";
import GiftCard from "./GiftCard";
import { uploadGiftCard } from "./productsApi";
import { useSelector, useDispatch } from "react-redux";

const token =
  localStorage.getItem("user") &&
  JSON.parse(localStorage.getItem("user")).token;

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    token: "Bearer " + token,
  },
};

const UploadCard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const { error, status, fetching, products, errorStatus } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  const handleUploadCard = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("type", type);
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("price", price);
    for (const file of Object(files)) {
      formData.append("photos", file);
    }

    await uploadGiftCard(dispatch, formData);
  };
  const handleBack = (e) => {
    navigate("/");
  };

  status && setTimeout(() => navigate("/"), 2000);
  return (
    <div className="card">
      <div className="card__main">
        <span className="card__close" onClick={handleBack}>
          x
        </span>
        <h1>Welcome to Flower Moments</h1>
        <p>upload as many Gift Cards as you can</p>
        <form
          className="card__form"
          encType="multipart/form-data"
          onSubmit={handleUploadCard}
        >
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="card__input"
            name="name"
            placeholder="Enter gift card name"
          />
          <input
            onChange={(e) => setType(e.target.value)}
            type="text"
            className="card__input"
            name="type"
            value="card"
            placeholder="Enter gift card type"
          />
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            className="card__input"
            name="quantity"
            placeholder="Enter gift card quantity"
          />
          <input
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            className="card__input"
            name="price"
            placeholder="Enter gift card price"
          />
          <input
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="card__input"
            name="description"
            placeholder="Enter gift card description"
          />
          <input
            onChange={(e) => setFiles(e.target.files)}
            className="card__input card__hidden"
            type="file"
            name="photos"
            id="images"
            multiple
          />
          <label className="card__label" htmlFor="images">
            choose photo
          </label>
          {error && (
            <p className="message error">
              Error occurred while creating Gift Card. make sure to fill all the
              inputs
            </p>
          )}
          {status && (
            <p className="message success">Gift Card Successfully created</p>
          )}
          <button className="uploadFlower__btn">
            {fetching ? "uploading" : "upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadCard;
