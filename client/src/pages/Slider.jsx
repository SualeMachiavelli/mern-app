import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const token =
  localStorage.getItem("user") &&
  JSON.parse(localStorage.getItem("user")).token;

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    token: "Bearer " + token,
  },
};
const Slider = () => {
  const loc = useLocation();
  const [quotes, setQuotes] = useState([]);
  const [titles, setTitles] = useState([]);
  const [files, setFiles] = useState([]);

  // const qw = Array.from({ length: loc?.state }, (_,i)=>  [quote,setQuote] = useState([]))}

  const handleSlider = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("quotes", quotes);
    formData.append("titles", titles);

    for (const photo of Object(files)) {
      formData.append("photos", photo);
    }
    try {
      const { data } = await axios.post(
        "http://localhost:8800/api/flowers/home",
        formData,
        config
      );
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  // console.log(quotes.length || false);
  return (
    <div className="slider">
      <form onSubmit={handleSlider}>
        {/* {Array.from({ length: loc?.state }, (_, i) => (
          <input
            onChange={(e) => setNe(e.target.value)}
            className="slider__input"
            type="text"
            placeholder={`Qoute ${i + 1}`}
            key={i}
          />
        ))} */}
        <textarea
          onChange={(e) => setQuotes(e.target.value)}
          className="slider__input"
          name="quotes"
          type="text"
          placeholder={`Qoute 1`}
        />
        <textarea
          onChange={(e) => setTitles(e.target.value)}
          className="slider__input"
          name="titles"
          type="text"
          placeholder={`write titles with semi colons as a seperator`}
        />
        {/* <input
          onChange={(e) => setQuote2(e.target.value)}
          className="slider__input"
          type="text"
          placeholder={`Qoute 2`}
        /> */}
        {/* <input
          onChange={(e) => setQuote3(e.target.value)}
          className="slider__input"
          type="text"
          placeholder={`Qoute 3`}
        /> */}
        <input
          type="file"
          onChange={(e) => setFiles(e.target.files)}
          className="slider__input slider__hidden"
          id="photos"
          name="photos"
          multiple
        />
        {quotes.length > 1 && (
          <label htmlFor="photos">
            Choose Exactly {quotes.length > 1 && quotes?.split(";")?.length}{" "}
            photos to match your quote
          </label>
        )}
        <button className="slider__btn">upload</button>
      </form>
    </div>
  );
};

export default Slider;
