import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

import { getBuoquets } from "./productsApi";
import { useNavigate } from "react-router-dom";
import ContactInfo from "./ContactInfo";
const Bouquets = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const getBuoquet = async () => {
      const data = await getBuoquets("/api/buoquets");
      setData(data.buoquets);
    };
    getBuoquet();
  }, []);

  const [single] = data;

  const handleView = (e) => {
    // const id = e.target.dataset.buoquetId;
    // navigate(`/single/${id}`, { state: single });

    setOpen(true);
  };

  // const si = data.map((b) => Object(b).map((item) => item));

  return (
    <>
      {/* <Navbar /> */}
      <div className="bouquet">
        <h2 className="bouquet__pricing">Bouquet Pricing</h2>
        <div className="bouquet__container">
          <div className="bouquet__card">
            <img
              className="bouquet__img"
              src={`/${single?.single?.single[0]?.path}`}
              alt={single?.single.singlename}
            />
            <div className="bouquet__items">
              <span className="bouquet__price">
                {single?.single?.singleprice}Ghc
              </span>
              <span className="bouquet__title bouquet__single">
                {single?.single?.singlename}
              </span>
              <div className="bouquet__btn-box">
                <button
                  className="bouquet__addtocart"
                  data-buoquet-id={single?._id}
                  onClick={handleView}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>

          <div className="bouquet__card">
            <img
              className="bouquet__img"
              src={`/${single?.elegant?.elegant[0]?.path}`}
              alt={single?.elegant.singlename}
            />
            <div className="bouquet__items">
              <span className="bouquet__price">
                {single?.elegant?.elegantprice}Ghc
              </span>
              <span className="bouquet__title bouquet__single">
                {single?.elegant?.elegantname}
              </span>
              <div className="bouquet__btn-box">
                <button
                  className="bouquet__addtocart"
                  onClick={handleView}
                  data-buoquet-id={single?._id}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>

          <div className="bouquet__card">
            <img
              className="bouquet__img"
              src={`/${single?.classique?.classique[0]?.path}`}
              alt={single?.classique?.singlename}
            />
            <div className="bouquet__items">
              <span className="bouquet__price">
                {single?.classique?.classiqueprice}Ghc
              </span>
              <span className="bouquet__title bouquet__single">
                {single?.classique?.classiquename}
              </span>
              <div className="bouquet__btn-box">
                <button
                  className="bouquet__addtocart"
                  data-buoquet-id={single?._id}
                  onClick={handleView}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>

          <div className="bouquet__card">
            <img
              className="bouquet__img"
              src={`/${single?.deluxe?.delux[0]?.path}`}
              alt={single?.deluxe.deluxename}
            />
            <div className="bouquet__items">
              <span className="bouquet__price">
                {single?.deluxe?.deluxeprice}Ghc
              </span>
              <span className="bouquet__title bouquet__single">
                {single?.deluxe.deluxename}
              </span>
              <div className="bouquet__btn-box">
                <button
                  className="bouquet__addtocart"
                  data-buoquet-id={single?._id}
                  onClick={handleView}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
        {open && <ContactInfo />}
      </div>
    </>
  );
};

export default Bouquets;
