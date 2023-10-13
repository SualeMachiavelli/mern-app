import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink, useNavigate } from "react-router-dom";
import Services from "./Services";
// import logo from "./assets/logo.png";
import Logo from "./assets/logo_FM.PNG";
import axios from "axios";

const user =
  localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

const config = {
  headers: {
    "Content-Type": "application/json",
    token: "Bearer " + user?.token,
  },
};

const Navbar = () => {
  const navigate = useNavigate();
  const [mouseEnter, setMouseEnter] = useState(false);
  const [data, setData] = useState([]);
  const handleNavigate = (e) => {
    if (user) {
      navigate("/cart");
    } else {
      navigate("/account");
    }

    // console.log(e.target);
  };
  let cartLength;
  const onlyCartCount = async () => {
    try {
      const { data: da } = await axios.get(
        `http://localhost:8800/api/cards/carts?user=${user?.user?._id}`,
        config
      );
      cartLength = da?.carts?.length;
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  onlyCartCount();

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const { data: info } = await axios(
          `http://localhost:8800/api/cards/carts?user=${user?.user?._id}`,
          config
        );
        const { carts: cdata } = info;
        cdata && setData(cdata);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    getCartItems();
  }, []);

  const handleMouseEnter = (e) => {
    setMouseEnter(true);
  };
  const handleMouseLeave = (e) => {
    setMouseEnter(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload(true);
  };

  return (
    <nav className="nav">
      <div className="nav__logo">
        <NavLink to="/">
          <img className="nav__logo-img" src={Logo} alt="logo__image" />
        </NavLink>
      </div>
      <ul className="nav__list">
        <li className="nav__item">
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="nav__item"
          >
            Home
          </Link>
        </li>
        <li className="nav__item">
          <Link
            to="pricing"
            spy={true}
            offset={50}
            smooth={true}
            duration={500}
            className="nav__item"
          >
            Pricing
          </Link>
        </li>

        <li
          className="nav__item"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            to="services"
            spy={true}
            smooth={true}
            duration={500}
            className="nav__item"
          >
            services
          </Link>
          {mouseEnter && <Services />}
        </li>

        <li className="nav__item">
          <Link
            to="about"
            spy={true}
            offset={50}
            smooth={true}
            duration={500}
            className="nav__item"
          >
            About
          </Link>
        </li>
        <li className="nav__item">
          <Link
            to="contact"
            spy={true}
            offset={20}
            smooth={true}
            duration={500}
            className="nav__item"
          >
            Contact
          </Link>
        </li>
        <li className="nav__item">
          <Link
            to="collection"
            spy={true}
            offset={20}
            smooth={true}
            duration={500}
            className="nav__item"
          >
            Collection
          </Link>
        </li>
        {/* <li className="nav__item">
          <Link
            to="testimonials"
            spy={true}
            offset={400}
            smooth={true}
            duration={500}
            className="nav__item"
          >
            Reviews
          </Link>
        </li> */}
        <li className="nav__item">
          <Link
            to="testimonials"
            spy={true}
            offset={400}
            smooth={true}
            duration={500}
            className="nav__item"
          ></Link>
        </li>
        {/* <li className="nav__item">
          <Link
            to="contact"
            spy={true}
            smooth={true}
            duration={500}
            className="nav__item"
          >
            Contact
          </Link>
        </li> */}
        {/* <li className="nav__item">Same day delivery</li> */}
      </ul>

      <div className="nav__auth">
        <ul>
          {user?.status !== "success" && (
            <NavLink to="/account">
              <li className="nav__link">Sign in</li>
            </NavLink>
          )}

          {user?.token && (
            <NavLink to="/profile">
              <li className="nav__link">Profile</li>
            </NavLink>
          )}

          {user && (
            <NavLink to="/">
              <li className="nav__link" onClick={handleLogout}>
                Logout
              </li>
            </NavLink>
          )}

          <li className="nav__cart" onClick={handleNavigate}>
            <ShoppingCartIcon style={{ fontSize: "2rem" }} />
            <span className="nav__count">
              {data?.length ? data?.length : 0}
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
