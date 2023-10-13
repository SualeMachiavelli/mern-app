import React, { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "./userApi";
import { useDispatch, useSelector } from "react-redux";
import logo from "./assets/logo_FM.PNG";
const initialState = {
  login: false,
  signup: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { login: true };
    case "signup":
      return { signup: true };
    default:
      return initialState;
  }
};

const Account = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, status, error, errorStatus } = useSelector(
    (state) => state.user
  );
  // const { isLoading, status, error, user } = useSelector((state) => state.user);
  const rDispatch = useDispatch();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginClose, setLoginClose] = useState(true);
  const [loginErrorClose, setLoginErrorClose] = useState(true);
  const [checkStatus, setCheckStatus] = useState("true");
  const [check, setCheck] = useState(false);

  const handleClose = () => {
    navigate("/");
  };

  const handleLoginActive = () => {
    dispatch({ type: "login" });
  };
  const handleSignupActive = () => {
    dispatch({ type: "signup" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(rDispatch, { email, password });

    status && setCheckStatus(true);

    checkStatus &&
      setTimeout(() => {
        setLoginClose((s) => !s);
        window.location.assign("/");
      }, 1000);

    if (errorStatus) {
      setTimeout(() => {
        setLoginClose((s) => !s);
        window.location.assign("/account");
      }, 1500);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    await signup(rDispatch, { email, password, username });

    checkStatus &&
      setTimeout(() => {
        setLoginClose((s) => !s);
      }, 1000);

    checkStatus &&
      setTimeout(() => {
        setLoginClose((s) => !s);
        window.location.assign("/");
      }, 1500);
  };

  return (
    <div className="account">
      <span onClick={handleClose} className="account__close">
        &larr;
      </span>
      <div className="account__main">
        <div className="account__select account__text-center">
          <h2 className="account__welcome">
            Welcome to <span>Flower Moments</span>
          </h2>
          <p className="account__title">We made it for you!</p>
          <div className="account__btn-box">
            <span
              className={`btn account__signup ${state.signup ? "active" : ""}`}
              onClick={handleSignupActive}
            >
              Sign up
            </span>
            <span
              className={`btn account__login ${state.login ? "active" : ""}`}
              onClick={handleLoginActive}
            >
              Login
            </span>
          </div>
        </div>
        {state.signup && (
          <div className="account__select account__split account__text-center signup">
            <div className="account__top">
              <div className="account__logo">
                <img className="account__logo-img" src={logo} alt="" />
              </div>
              <p className="account__hello">Hello,</p>
              <h3 className="account__acctext">Create Your Acccount</h3>
            </div>
            <form
              className="account__form account__bottom"
              onSubmit={handleSignup}
            >
              <h1 className="account__heading">Sign up</h1>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="account__input"
                type="email"
                placeholder="Enter email address"
              />
              <input
                onChange={(e) => setUsername(e.target.value)}
                className="account__input"
                type="text"
                placeholder="Enter full name"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="account__input"
                type="password"
                placeholder="enter password"
              />
              {check && <button className="account__btn btn">sign up</button>}
              {isLoading && <p className="loading">account creating...</p>}
              <div className="account__policy">
                <input type="checkbox" id="pp" onClick={() => setCheck(true)} />
                <label htmlFor="pp" onClick={() => setCheck(true)}>
                  By clicking means you've accepted our policy
                </label>
                {error && (
                  <p className="error message">
                    There was an error signing up. check the inputs and try
                    again
                  </p>
                )}

                {status && loginClose && (
                  <p className="message success">Sign up successfully</p>
                )}
              </div>
            </form>
          </div>
        )}

        {state.login && (
          <div className="account__select account__split account__text-center login">
            <div className="account__top">
              <div className="account__logo">
                <img className="account__logo-img" src={logo} alt="" />
              </div>
              <p className="account__hello">Hello,</p>
              <h3 className="account__acctext">Log Into Your Acccount</h3>
            </div>
            <form
              className="account__form account__bottom"
              onSubmit={handleLogin}
            >
              <h1 className="account__heading">Login</h1>
              <input
                className="account__input"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                name="email"
              />
              <input
                name="password"
                className="account__input"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
              {check && <button className="account__btn btn">Login</button>}
              {isLoading && <p className="account__loading">Logging in...</p>}
              <div className="account__policy">
                <input type="checkbox" id="pp" onClick={() => setCheck(true)} />
                <label htmlFor="pp" onClick={() => setCheck(true)}>
                  By clicking means you've accepted our policy
                </label>
                {error && loginErrorClose && (
                  <p className="error message">{error}</p>
                )}

                {status && loginClose && (
                  <p className="message success">Login successfully</p>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
