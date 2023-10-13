import React from "react";
import { NavLink } from "react-router-dom";

const List = () => {
  return (
    <div className="settings">
      <ul className="settings__list">
        <NavLink to="/uploadflower">
          <li className="settings__link"> FLower</li>
        </NavLink>
        <NavLink to="/giftcards">
          <li className="settings__link">Gift Card</li>
        </NavLink>
        <NavLink to="/upload-buoquet">
          <li className="settings__link">upload Buoquet</li>
        </NavLink>
        <NavLink to="/home">
          <li className="settings__link">Change Home Page background</li>
        </NavLink>
        <NavLink to="/bouquets">
          <li className="settings__link">Buoquets</li>
        </NavLink>{" "}
        <NavLink to="/party">
          <li className="settings__link">Party</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default List;
