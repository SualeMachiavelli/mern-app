import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { user: null };
  const loggedInUser = user.user;
  return (
    <nav className="nav">
      <div>
        <span className="nav__logo">
          <Link to="/">FlowerMoment</Link>
        </span>
      </div>
      <ul>
        {/* <li>
          <Link to="/login">Login</Link>
        </li> */}
        {!loggedInUser && (
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        )}
        {!loggedInUser && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        <li>
          <Link to="/upload">upload</Link>
        </li>
        {
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        }
      </ul>
    </nav>
  );
};

export default NavBar;
