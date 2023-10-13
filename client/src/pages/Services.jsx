import React, { useState } from "react";
import ArrowLeft from "./ArrowLeft";
import { NavLink } from "react-router-dom";

const Services = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleMouseLeave = () => {
    setShow(false);
  };
  return (
    <ul className="servicesNav__item-box hidden">
      <li className="servicesNav__item">
        <span>Gifts/Cards</span>
        <ArrowLeft arrow="servicesNav__arrow" />
        <ul className="servicesNav__item-nest">
          <NavLink to="/bouquets">
            <li>Bouquets</li>
          </NavLink>
          <li>Hampers</li>
          <li>Cards</li>
        </ul>
      </li>
      <li className="servicesNav__item">
        <span>Green Space Interior</span>
        <ArrowLeft arrow="servicesNav__arrow" />
        <ul className="servicesNav__item-nest">
          <li>Offers</li>
          <li>Homes</li>
          <li>Schools</li>
        </ul>
      </li>
      <li className="servicesNav__item">
        <span>Events</span>
        <ArrowLeft arrow="servicesNav__arrow" />
        <ul className="servicesNav__item-nest">
          <li>Birthday</li>
          <li>Holidays</li>

          <NavLink to="/others">
            <li>wedding</li>
          </NavLink>
          <NavLink to="/others">
            <li>Anniversary</li>
          </NavLink>
          <NavLink to="/others">
            <li>Parties</li>
          </NavLink>
          <li>Cocktail</li>
          <li>Memorial services</li>
        </ul>
      </li>
      <li className="servicesNav__item">
        <span>Gardens</span>
        <ArrowLeft arrow="servicesNav__arrow" />
        <ul className="servicesNav__item-nest">
          <li>Trees/shrubs</li>
          <li onClick={handleShow} className="servicesNav__flowers">
            <span>Flowers</span>
            <ArrowLeft arrow="servicesNav__arrow" />
          </li>
          {show && (
            <ul
              className="servicesNav__nest-nest"
              onMouseLeave={handleMouseLeave}
            >
              <li>orchids</li>
              <li>airplants</li>
              <li>succulents</li>
              <li>ferns</li>
              <li>others</li>
            </ul>
          )}
        </ul>
      </li>
      <li className="servicesNav__item">
        <span>Landscaping</span>
        <ArrowLeft arrow="servicesNav__arrow" />
      </li>
    </ul>
  );
};

export default Services;
