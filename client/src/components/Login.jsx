import React, { useState, useEffect } from "react";
import { login } from "../ApiFetch";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="login">
      {/* <div className="login__bg"></div> */}
      <img
        src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zmxvd2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
        alt=""
      />
      <form action="#" className="login__form" onSubmit={handleSubmit}>
        <h3>Get started with flower moments</h3>

        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          className="login__input"
          placeholder="Enter your email address"
        />
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          className="login__input"
          placeholder="Enter your password"
        />

        <button className="btn login__btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
