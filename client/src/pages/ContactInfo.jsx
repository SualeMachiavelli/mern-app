import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="info">
      <ul>
        <li className="info__table">Contact</li>
        <li>0240915457</li>
      </ul>

      <ul>
        <li className="info__table">Social Media</li>

        <NavLink to="https://www.facebook.com/FlowerMomentsbyAmenPeters?mibextid=LQQJ4d">
          <li>
            <FaFacebookF />
          </li>
        </NavLink>

        {/* <NavLink to="">
          <li>Twitter</li>
        </NavLink> */}

        {/* <NavLink to="">
          <li>Instagram</li>
        </NavLink> */}

        <NavLink to="https://wa.me/message/YENPJP3SH35JF1">
          <li>
            <FaWhatsapp />
          </li>
        </NavLink>
      </ul>

      <ul>
        <li className="info__table">Location</li>
        <NavLink to="https://maps.app.goo.gl/RYdJofncUampUR539?g_st=ic">
          <li>
            <FaMapMarkerAlt />
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default ContactInfo;
