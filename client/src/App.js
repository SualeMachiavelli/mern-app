import React from "react";
// import NavBar from "./components/NavBar";
import Home from "./pages/Home";
// import AllProducts from "./components/AllProducts";

// import Footer from "./components/Footer";

// import Login from "./components/Login";
// import Signup from "./components/Signup";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import Profile from "./components/Profile";
// import Upload from "./components/Upload";
// import Admin from "./components/Admin";
import Navbar from "./pages/Navbar";
import Products from "./components/Products";

import Account from "./pages/Account";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import WriteReview from "./pages/WriteReview";
import Error from "./pages/Error";
import UploadFlower from "./pages/UploadFlower";
import Slider from "./pages/Slider";
import FakeSlider from "./pages/FakeSlider";
import GiftCard from "./pages/GiftCard";
import UploadCard from "./pages/UploadCard";
import Admin from "./pages/Admin";
import Data from "./pages/Data";
import Bouquets from "./pages/Bouquets";
import BuoquetUpload from "./pages/BuoquetUpload";
import Hampers from "./pages/Hampers";
import Parties from "./pages/Parties";
import Others from "./pages/Others";
import Profile from "./pages/Profile";
import Settings from "./pages/Admin/Settings";

export default function App() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { user: null };
  // const { token } = user;

  // console.log(token);

  return (
    // <BrowserRouter>
    //   <NavBar />
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="login" element={<Login />} />
    //     <Route path="signup" element={<Signup />} />
    //     <Route path="profile" element={<Admin />} />
    //     <Route path="upload" element={<Upload />} />
    //     <Route path="flowers/:flowerId" element={<AllProducts />} />
    //   </Routes>
    //   <Footer />
    // </BrowserRouter>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="account" element={<Account />} />
        <Route path="/flowers/:id" element={<Data />} />
        <Route path="/giftcards" element={<UploadCard />} />
        <Route path="/giftcards/:id" element={<Data />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/flowers/:flowerId/reviews" element={<WriteReview />} />
        <Route path="uploadflower" element={<UploadFlower />} />
        <Route path="home" element={<Slider />} />
        <Route path="slider" element={<FakeSlider />} />
        {/* <Route path="profile" element={<Admin />} /> */}
        <Route path="bouquets" element={<Bouquets />} />
        <Route path="upload-buoquet" element={<BuoquetUpload />} />
        <Route path="party" element={<Parties />} />
        <Route path="others" element={<Others />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Error />} />

        {/* <Scroll /> */}
      </Routes>
    </BrowserRouter>
  );
}
