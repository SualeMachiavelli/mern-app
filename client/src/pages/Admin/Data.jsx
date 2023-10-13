import React, { useState } from "react";
import axios from "axios";

const user =
  localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    token: "Bearer " + user?.token,
  },
};

const Data = () => {
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("photo", photo);
    const updateData = async () => {
      try {
        const { data } = await axios.patch(
          "http://localhost:8800/api/users/updateMe",
          formData,
          config
        );
        console.log(data);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };

    await updateData();
  };

  return (
    <div className="settings">
      <div className="settings__data">
        <span className="settings__close">&times;</span>
        <h2>Upload your photo and username here</h2>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="settings__dinput"
            type="text"
            defaultValue={user?.user?.username}
            name="username"
            placeholder="enter new username"
          />
          <input
            onChange={(e) => setPhoto(e.target.files[0])}
            className="settings__dinput hidden"
            type="file"
            name="photo"
            id="photo"
          />
          <label htmlFor="photo" className="settings__label">
            Select photo
          </label>
          <button className="settings__dbtn">update</button>
        </form>
      </div>
    </div>
  );
};

export default Data;
