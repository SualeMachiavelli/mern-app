import React, { useEffect, useReducer, useState } from "react";
import Star from "./Star";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadingReducer, loadingInitialState } from "./reducer";
import Card from "./Card";
import {
  fetchProducts,
  getCards,
  getSearchProducts,
  getSearchedProducts,
} from "./productsApi";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Star";

const token =
  localStorage.getItem("user") &&
  JSON.parse(localStorage.getItem("user")).token;

const config = {
  headers: {
    "Content-Type": "application/json",
    token: "Bearer " + token,
  },
};

const Pricing = () => {
  const starColor = "#fff";
  const [search, setSearch] = useState("");
  const [select1, setSelect1] = useState("flower");
  const [select2, setSelect2] = useState("card");
  const [inputSearch, setInputSearch] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [getValue, setGetValue] = useState("");
  const dispatch = useDispatch();
  const { fetching } = useSelector((state) => state.product);

  let value;
  const handleSearchInput = async (e) => {
    value = e.target.dataset.name.toLowerCase();
    setInputSearch(value);
    setGetValue(value);

    const { data } = await getSearchProducts(dispatch, value);

    // const { flowers: fdata } = dInfo.data;
    // const { cards: cdata } = dInfo.data;
    data?.flowers?.length > 0 && setData(data?.flowers);
    data?.cards?.length > 0 && setData(data?.cards);
  };

  const handleView = (e) => {
    const flowerId = e.target.dataset.flowerId;
    const type = e.target.dataset.type;

    const slug = e.target.dataset.flowerIid;
    const cardId = e.target.dataset.cardId;
    const cardSlug = e.target.dataset.cardIid;

    type === "flower" &&
      navigate(`/flowers/${flowerId}`, {
        state: data[slug],
        type: data[slug].type,
      });
    type === "card" &&
      navigate(`/giftcards/${cardId}`, { state: data[cardSlug] });
  };

  useEffect(() => {
    let info;
    const getFlowers = async () => {
      info = await fetchProducts(dispatch);
      if (info?.flowers?.length > 0) setData(info?.flowers);
      if (info?.cards?.length > 0) setData(info?.cards);
    };
    getFlowers();
  }, [dispatch]);

  const handleSearch = async (e) => {
    e.preventDefault();

    setGetValue(value);
    const data = await getSearchedProducts(dispatch, getValue, search);
    data?.flowers?.length > 0 && setData(data?.flowers);
    data?.cards?.length > 0 && setData(data?.cards);

    data?.flowers?.length === 0 && (
      <p className="pricing__nofound">No search found for</p>
    );
    data?.cards?.length === 0 && <p>No search found for</p>;
  };

  const handleCardClick = (e) => {};

  return (
    <section className="pricing" id="pricing">
      {/* <h2>Featured pricing, search by name:</h2> */}

      <h1 className="pricing__title">Our Prices</h1>
      <div className="pricing__search">
        <div className="pricing__scontent">
          <ul>
            <span className="pricing__sTable">Tap to search</span>
            <span
              className="pricing__sinput"
              data-name="flower"
              onClick={handleSearchInput}
            >
              Flower
            </span>
            <span
              className="pricing__sinput"
              data-name="card"
              onClick={handleSearchInput}
            >
              Card
            </span>
          </ul>

          <form onSubmit={handleSearch} data-product-type={getValue}>
            <select className="pricing__options" onClick={handleCardClick}>
              <option className="pricing__option">{getValue}</option>
            </select>

            <input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              className="pricing__input"
              placeholder="search flower names,type"
            />

            {/* <input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              className="pricing__input pricing__hidden"
              placeholder="search flower names,type"
            /> */}
            {/* <button className="btn pricing__sbtn">Search</button> */}
          </form>
        </div>
      </div>

      <div className="pricing__container">
        {data?.map((info, i) =>
          info.type === "flower" ? (
            <div key={i} className="pricing__single">
              <img
                className="pricing__photo"
                src={info?.photos[0]?.filePath}
                alt={info?.name}
              />
              <div className="pricing__items">
                <div className="pricing__ratings">
                  <div>{/* <Star color={starColor} /> */}</div>
                  <span className="pricing__rating">3.4</span>
                </div>
                <span className="pricing__name">{info?.name}</span>
                <span className="pricing__price">Ghc{info?.price}</span>
                <button
                  className="pricing__btn"
                  onClick={handleView}
                  data-flower-id={info._id}
                  data-type={info.type}
                  data-card-id={info._id}
                  data-flower-iid={i}
                  data-card-iid={i}
                >
                  View
                </button>
              </div>
            </div>
          ) : (
            <Card info={info} key={i} data={data} iCount={i} />
          )
        )}
      </div>
    </section>
  );
};

export default Pricing;
