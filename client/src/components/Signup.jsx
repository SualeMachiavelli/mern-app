import React, { useState } from "react";
import { signup } from "../ApiFetch";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({ username, email, password });
  };
  return (
    <div className="signup">
      <div className="signup__bg"></div>
      <img
        src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zmxvd2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
        alt=""
      />
      <form className="signup__form" onSubmit={handleSubmit}>
        <h3>Get started with flower moments</h3>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          className="signup__input"
          name="username"
          placeholder="Enter your full name"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          className="signup__input"
          placeholder="Enter your email address"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          className="signup__input"
          placeholder="Enter your password"
        />
        <input
          type="file"
          name="photo"
          className="signup__input signup__hidden"
          id="photo"
        />
        <label htmlFor="photo">choose photo</label>
        <button className="btn signup__btn">signup</button>
      </form>
    </div>
  );
};

export default Signup;
