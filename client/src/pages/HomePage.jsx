import React from "react";
import Pricing from "./Pricing";
import About from "./About";
import Contact from "./Contact";
import Review from "./Reviews";
import Services from "./Services";
import Home from "./Home";
import Navbar from "./Navbar";
import Ratings from "./Ratings";
import Bouquets from "./Bouquets";
import Collection from "./Collection";
const HomePage = () => {
  return (
    <>
      <Navbar />
      <Home />
      <Pricing />
      <Bouquets />
      <Collection />
      <Services />
      <About />
      {/* <Review /> */}
      <Contact />
    </>
  );
};

export default HomePage;
