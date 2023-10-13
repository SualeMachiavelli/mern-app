import axios from "axios";
import React, { useState } from "react";

const user =
  localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

const config = {
  headers: {
    "Content-Type": "application/json",
    token: "Bearer " + user?.token,
  },
};

const Password = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    const updateData = async () => {
      try {
        const { data } = await axios.patch(
          "http://localhost:8800/api/users/updatePassword",
          formData,
          config
        );
        console.log(data);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };

    await updateData();
    console.log(password, confirmPassword);
  };
  return (
    <div className="settings">
      <div className="settings__password">
        <span className="settings__close">&times;</span>
        <h2>update your password here</h2>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setConfirmPassowrd(e.target.value)}
            className="settings__password"
            type="password"
            name="confirmPassword"
            placeholder="enter your old password here"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="settings__password"
            type="password"
            name="password"
            placeholder="enter your new password here"
          />

          <button className="settings__pbtn">update</button>
        </form>
      </div>
    </div>
  );
};

export default Password;
