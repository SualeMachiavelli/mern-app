import React, { useEffect, useReducer, useState } from "react";
// import { loginInitialState, loginReducer } from "./reducer";
import Star from "./Star";
import RelatedFlowers from "./RelatedFlowers";
import ReviewsPage from "./ReviewsPage";
import { useLocation, useNavigate } from "react-router-dom";
import AddContact from "./AddContact";
import { checkCard, checkFlower, saveCart } from "./flowerAPI";
import axios from "axios";
import Gallery from "./Gallery";
import { addToCart, checkAndAddToCart } from "./productsApi";
import ContactInfo from "./ContactInfo";

const token =
  localStorage.getItem("user") &&
  JSON.parse(localStorage.getItem("user")).token;

const config = {
  headers: {
    "Content-Type": "application/json",
    token: "Bearer " + token,
  },
};

const initialState = {
  desc: true,
  review: false,
  gallery: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "desc":
      return { desc: true };
    case "review":
      return { review: true };
    case "gallery":
      return { gallery: true };
    default:
      return initialState;
  }
};

const initial = {
  desc: true,
  review: false,
  gallery: false,
};
const reduc = (state, action) => {
  switch (action.type) {
    case "desc":
      return { desc: true };
    case "review":
      return { review: true };
    case "gallery":
      return { gallery: true };
    default:
      return initial;
  }
};

const initialOrderState = {
  order: false,
  content: true,
};

const orderReducer = (state, action) => {
  switch (action.type) {
    case "order":
      return { order: true };
    case "content":
      return { content: true };
    default:
      return initialOrderState;
  }
};

const Data = () => {
  // const {isLoading,error} = loadingInitialState

  const colorStar = "#862e9c";
  const [state, dispatch] = useReducer(reducer, initialState);
  const [activeState, dispatcher] = useReducer(reduc, initial);
  const [orderState, dispatchOrder] = useReducer(
    orderReducer,
    initialOrderState
  );

  const info = useLocation();
  const data = info?.state;
  const type = info?.state?.type;
  const fakeImage = [0, 0, 0];
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [imagePath, setImagePath] = useState("");
  const [avPath, setAvPath] = useState(false);
  const [status, setStatus] = useState(false);
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [exist, setExist] = useState("");

  const handleReviews = (e) => {
    dispatch({ type: "review" });
    dispatcher({ type: "review" });
  };

  const handleDesc = (e) => {
    dispatch({ type: "desc" });
    dispatcher({ type: "desc" });
  };

  const handleGallery = (e) => {
    dispatch({ type: "gallery" });
    dispatcher({ type: "gallery" });
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleShowContent = () => {
    dispatchOrder({ type: "content" });
  };

  const handleAddToCart = async (e) => {
    const orderItems = {
      dataId: data._id,
      total: data.price * count,
      name: data.name,
      quantity: count,
      photo: data.photos[0],
      price: data.price,
      type: data.type,
    };
    let dinfo;
    if (orderItems.type === "flower") {
      // dinfo = await addToCart(
      //   dispatch,
      //   `http://localhost:8800/api/${orderItems.type}s/${orderItems.dataId}`,
      //   orderItems
      // );
      dinfo = await checkAndAddToCart(
        dispatch,
        `http://localhost:8800/api/carts/${orderItems.dataId}`,
        orderItems
      );
    } else if (orderItems.type === "card") {
      // dinfo = await addToCart(
      //   dispatch,
      //   `http://localhost:8800/api/${orderItems.type}s/${orderItems.dataId}`,
      //   orderItems
      // );
      dinfo = await checkAndAddToCart(
        dispatch,
        `http://localhost:8800/api/carts/${orderItems.dataId}`,
        orderItems
      );
    }

    if (dinfo.status === "success") {
      setStatus(dinfo?.status === "success");
      setTimeout(() => navigate("/cart"), 3000);
    }
  };

  status && setTimeout(() => setStatus(false), 2000);

  const handleShowOrder = () => {
    dispatchOrder({ type: "order" });
  };

  const handleDec = () => {
    count > 1 && setCount((c) => c - 1);
  };
  const handleInc = () => {
    setCount((c) => c + 1);
  };

  const handleImageChange = (e) => {
    const path = e.target.src.slice(21);
    setImagePath(path);
    setAvPath(true);
  };

  useEffect(() => {
    const getCheckFlower = async () => {
      if (type === "flower") {
        const fId = data.type === "flower" && data._id;
        const fd = await checkFlower(fId);
        fd && setExist(fd.status);
      } else if (type === "card") {
        const cId = data.type === "card" && data._id;
        const cd = await checkCard(cId);

        cd && setExist(cd.status);
      }
    };
    getCheckFlower();
  }, [type, data]);

  return (
    <section className="flower">
      <main className="flower__main">
        <span className="flower__close" onClick={handleBack}>
          &larr;
        </span>
        <div className="flower__img-box">
          <div className="flower__bgc"></div>
          <img
            className="flower__bg"
            src={`/${data?.photos[1]?.filePath}`}
            alt=""
          />
        </div>
        <div className="flower__container">
          <div className="flower__photo-box">
            <img
              className="flower__image"
              src={avPath ? imagePath : `/${data?.photos[1]?.filePath}`}
              alt=""
            />

            <div className="flower__gallery-box">
              {fakeImage.map((_, i) => (
                <img
                  onClick={handleImageChange}
                  key={i}
                  className="flower__gallery"
                  src={`/${data?.photos[i]?.filePath}`}
                  alt={data?.name}
                />
              ))}

              <span className="flower__all" onClick={handleGallery}>
                &rarr;
              </span>
            </div>
          </div>
          {orderState?.content && (
            <div className="flower__content">
              <span className="flower__name">{data?.name}</span>
              <span className="flower__price">{data?.price}ghc</span>
              <span className="flower__rating">
                <button
                  className="flower__contact"
                  onClick={() => setOpen((s) => !s)}
                >
                  Contact us
                </button>
                {open && <ContactInfo />}
              </span>
              {/* <span className="flower__desc">{flower?.description}</span> */}
              <div className="flower__items">
                <div className="flower__center">
                  {!exist && (
                    <div className="flower__counters">
                      <button className="flower__btn" onClick={handleDec}>
                        -
                      </button>
                      <span className="flower__count">{count}</span>
                      <button className="flower__btn" onClick={handleInc}>
                        +
                      </button>
                    </div>
                  )}
                  {status && <p className="message success">Added to cart</p>}
                  {!exist ? (
                    <button
                      className="flower__addtocart"
                      data-card-id={data._id}
                      // data-flower-id={flower._id}
                      onClick={handleAddToCart}
                    >
                      <span
                        data-card-id={data._id}
                        data-flower-id={data._id}
                        data-data-type={data.type}
                        data-data-id={data._id}
                      >
                        Add to cart
                      </span>
                      <span>+</span>
                    </button>
                  ) : (
                    <button className="flower__addtocart">
                      <span onClick={() => navigate("/cart")}>Update cart</span>
                    </button>
                  )}

                  {/* <button
                    className="flower__addtocart"
                    onClick={handleShowOrder}
                  >
                    <span>Order</span>
                    <span>+</span>
                  </button> */}
                </div>
                <ul>
                  <li className="flower__type">
                    Type: <span>{data?.type}</span>
                  </li>
                  {/* <li className="flower__type">
                    family: <span>{flower?.family}</span>
                  </li> */}
                  <li className="flower__type">
                    Stock: <span>{data?.quantity} items in stock</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {orderState?.order && (
            <AddContact
              count={count}
              orderdata={data}
              dispatch={dispatchOrder}
            />
          )}
        </div>
        <div className="flower__descs">
          <div className="flower__desc-box">
            <ul>
              <li
                className={`flower__item ${activeState.desc ? "active" : ""}`}
                onClick={handleDesc}
              >
                Description
              </li>
              <li
                className={`flower__item ${
                  activeState?.review ? "active" : ""
                }`}
                onClick={handleReviews}
              >
                Review
              </li>
              <li
                className={`flower__item ${
                  activeState?.gallery ? "active" : ""
                }`}
                onClick={handleGallery}
              >
                Gallery
              </li>
            </ul>
          </div>
          {state?.desc && <p className="flower__text">{data?.description}</p>}
          {state?.review && <ReviewsPage />}
          {state?.gallery && <Gallery photos={data?.photos} />}
        </div>
        <RelatedFlowers type={type} />
      </main>
    </section>
  );
};

export default Data;
