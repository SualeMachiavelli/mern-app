import React from "react";

const Testimonial = () => {
  return (
    <div className="testimonial">
      <h2 className="testimonial__title">Testimonials from customers</h2>
      <div className="testimonial__single">
        <div className="testimonial__photo-box">
          <img
            className="testimonial__photo"
            src="https://media.istockphoto.com/id/1152789022/photo/senior-woman-potting-plant-in-garden-at-home.webp?b=1&s=170667a&w=0&k=20&c=0aRmBEjX0aLSboHvsxZJsaRRLRBAhTDAaluoNJniym0="
            alt=""
          />
        </div>
        <div className="testimonial__content">
          <p className="testimonial__comment">
            <em>
              Wow!! it was an amazing and beautiful as a buy my first flower
              from Flower Moments. it was beyond expections :D
            </em>
          </p>
          <span className="testimonial__name">- Mike James</span>
        </div>
      </div>
      <div className="testimonial__count">
        <span className="testimonial__counter"></span>
        <span className="testimonial__counter active"></span>
        <span className="testimonial__counter"></span>
      </div>
    </div>
  );
};

export default Testimonial;
