import React, { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ContactInfo from "./ContactInfo";
const Others = () => {
  const myRef = useRef();
  const [visible, setVisible] = useState(false);

  return (
    <div className="other">
      <div className="other__container">
        <div className="other__bg"></div>
        <div className="other__card">
          <img
            className="other__bg-img"
            src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdlZGRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
            alt=""
          />

          <div className="other__main">
            <div className="other__img-box">
              {/* <img
                className="other__img"
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdlZGRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
                alt=""
              />
              <img
                className="other__top"
                src="https://images.unsplash.com/photo-1550005809-91ad75fb315f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdlZGRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
                alt=""
              /> */}
            </div>

            <div className="other__content">
              <p className="other__heading">Some of our services include</p>
              <ul className="other__list">
                <li className="other__item">Weddings</li>
                <li className="other__item">Anniversary</li>
                <li className="other__item">Parties</li>
                <li className="other__item">Holidays</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="other__partym">
        <div className="other__party">
          <img
            className="other__img"
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdlZGRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
            alt=""
          />
          {/*
           <LazyLoadImage
            src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdlZGRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
            width={600}
            height={400}
            className="other__img"
          /> */}
          <div className="other__info">
            <h1 className="other__title">Wedding moments</h1>
            <p className="other__para">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod te <b />
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim i
            </p>
            <button className="other__btn">check out</button>
          </div>
        </div>
      </div>

      <ContactInfo />
    </div>
  );
};

export default Others;
