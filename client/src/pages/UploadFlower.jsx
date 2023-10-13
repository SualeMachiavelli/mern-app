import axios from "axios";
import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import { uploadFlower } from "./productsApi";
import { useDispatch, useSelector } from "react-redux";

const token =
  localStorage.getItem("user") &&
  JSON.parse(localStorage.getItem("user")).token;

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    encType: "multipart/form-data",
    token: "Bearer " + token,
  },
};

const UploadFlower = () => {
  // const [state, dispatch] = useReducer(loadingReducer, loadingInitialState);
  const { error, status, fetching, products, errorStatus } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const handleUploadFlower = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("price", price);
    formData.append("quantity", quantity);
    for (const file of Object(files)) {
      formData.append("photos", file);
    }

    await uploadFlower(dispatch, formData);
  };
  // console.log(isLoading, error);

  const handleBack = () => {
    navigate("/");
  };
  status && setTimeout(() => navigate("/"), 2000);
  return (
    <div className="uploadFlower">
      <div className="uploadFlower__main">
        <span className="uploadFlower__close" onClick={handleBack}>
          x
        </span>
        <h1>Welcome to Flower Moments</h1>

        <p>upload as many flowers as you can</p>
        <form
          className="uploadFlower__form"
          encType="multipart/form-data"
          onSubmit={handleUploadFlower}
        >
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="uploadFlower__input"
            name="name"
            placeholder="Enter flower name"
          />
          <input
            onChange={(e) => setType(e.target.value)}
            type="text"
            className="uploadFlower__input"
            name="type"
            placeholder="Enter flower family"
          />
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            className="uploadFlower__input"
            name="quantity"
            placeholder="Enter flower quantity"
          />
          <input
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            className="uploadFlower__input"
            name="price"
            placeholder="Enter flower price"
          />
          <input
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="uploadFlower__input"
            name="description"
            placeholder="Enter flower description"
          />
          <input
            onChange={(e) => setFiles(e.target.files)}
            className="uploadFlower__input uploadFlower__hidden"
            type="file"
            name="photos"
            id="images"
            multiple
          />
          <label className="uploadFlower__label" htmlFor="images">
            choose photo
          </label>

          {error && (
            <p className="message error">
              Error occurred while creating flower. make sure to fill all the
              inputs
            </p>
          )}
          {status && (
            <p className="message success">Flower Successfully created</p>
          )}
          <button className="uploadFlower__btn">
            {fetching ? "uploading" : "upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadFlower;
