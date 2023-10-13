import React, { useState } from "react";
import ArrowLeft from "./ArrowLeft";
const Service = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow((state) => !state);
  };

  return (
    <section className="service" id="services">
      <h1 className="service__title">Our Services</h1>
      <main className="service__main">
        <ul className="service__item-box">
          <li className="service__item">
            <span>Gifts/Cards</span>
            <ArrowLeft />
            <ul className="service__item-nest">
              <li>Bouquets</li>
              <li>Hampers</li>
              <li>Cards</li>
            </ul>
          </li>
          <li className="service__item">
            <span>Green Space Interior</span>
            <ArrowLeft />
            <ul className="service__item-nest">
              <li>Offers</li>
              <li>Homes</li>
              <li>Schools</li>
            </ul>
          </li>
          <li className="service__item">
            <span>Events</span>
            <ArrowLeft />
            <ul className="service__item-nest">
              <li>Birthday</li>
              <li>Holidays</li>
              <li>wedding</li>
              <li>anniversity</li>
              <li>Parties</li>
              <li>Cocktail</li>
              <li>Memorial Services</li>
            </ul>
          </li>
          <li className="service__item">
            <span>Gardens</span>
            <ArrowLeft />
            <ul className="service__item-nest">
              <li>Trees/shrubs</li>
              <li onClick={handleShow} className="service__flowers">
                <span>Flowers</span>
                <ArrowLeft />
              </li>
              {show && (
                <ul className="service__nest-nest">
                  <li>orchids</li>
                  <li>airplants</li>
                  <li>succulents</li>
                  <li>ferns</li>
                  <li>others</li>
                </ul>
              )}
            </ul>
          </li>
          <li className="service__item">
            <span>Landscaping</span>
            <ArrowLeft />
          </li>
        </ul>
      </main>
    </section>
  );
};

export default Service;
