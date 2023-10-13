import React from "react";
import { FaFacebookF, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Contact = () => {
  const handleForm = (e) => {
    e.preventDefault();
  };
  return (
    <section id="contact" className="contact">
      <h1 className="contact__title">Contact US</h1>
      <main className="contact__main">
        <div className="contact__bg"></div>
        <img
          className="contact__photo"
          src="https://images.unsplash.com/photo-1602615576820-ea14cf3e476a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGZsb3dlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
          alt="nddd"
        />
        <div className="contact__content">
          <p className="contact__heading">Leave us with your email :)</p>
          <form className="contact__form" onSubmit={handleForm}>
            <input placeholder="enter email address" />
            <button className="btn contact__sbtn"> submit</button>
          </form>
        </div>
        <ul>
          <li>
            <span>0240915457</span>
            <NavLink to="https://www.facebook.com/FlowerMomentsbyAmenPeters?mibextid=LQQJ4d">
              <span>
                <FaFacebookF />
              </span>
            </NavLink>
            {/* <span>+233 2465398483</span> */}
          </li>
          <li>
            {/* <span>+233 5673838393</span> */}
            {/* <span>www.instagram.com/flowers.momenta</span> */}
            <NavLink to="https://maps.app.goo.gl/RYdJofncUampUR539?g_st=ic">
              <span>
                <FaMapMarkerAlt />
              </span>
            </NavLink>

            <NavLink to="https://wa.me/message/YENPJP3SH35JF1">
              <span>
                <FaWhatsapp />
              </span>
            </NavLink>
          </li>
        </ul>
      </main>
    </section>
  );
};

export default Contact;
