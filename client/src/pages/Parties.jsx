import React from "react";
import { useNavigate } from "react-router-dom";

const Parties = () => {
  const navigate = useNavigate();

  const handleWork = () => {
    navigate("/others");
  };
  return (
    <div className="party">
      <div className="party__container">
        <div className="party__bg"></div>
        <div className="party__card">
          <img
            src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFydGllc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
            alt=""
          />
          <div className="party__box">
            <div className="party__content">
              <p className="party__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla
              </p>
              <div className="party__btns">
                <button className="party__btn party__more">read more</button>
                <button className="party__btn party__work" onClick={handleWork}>
                  how it works
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parties;
