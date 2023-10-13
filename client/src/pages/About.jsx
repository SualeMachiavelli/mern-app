import React from "react";

const About = () => {
  return (
    <section className="about" id="about">
      <h1 className="about__title">About Us</h1>
      <main className="about__main">
        <img
          className="about__img"
          src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zmxvd2Vyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          alt=""
        />
        <div className="about__content">
          <h1 className="about__heading">Flower Moments</h1>
          <p className="about__text">
            Flower Moments is a versatile flower business that offers urban
            gardening, green-space designing, and other floral arrangement
            services. We offer custom flower arrangements for special occasions
            and offer a wide selection of fresh flowers at our ShopEasy online
            shop for every occasion. We also offer flower delivery services for
            both same-day and next-day delivery and even have subscriptions for
            regular customers. Our team of experienced florists work closely
            with clients to create beautiful and unique arrangements tailored to
            their specific needs. Flower Moments is an excellent choice for
            anyone looking for high-quality flower services.
          </p>
          <button className="btn about__btn">Learn more..</button>
        </div>
      </main>
    </section>
  );
};

export default About;
