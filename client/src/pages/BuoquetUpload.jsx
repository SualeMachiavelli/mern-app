import React, { useState } from "react";
import { uploadBuoquet } from "./productsApi";

const BuoquetUpload = () => {
  const [status, setStatus] = useState(false);
  const [singlename, setSinglename] = useState("");
  const [singleprice, setSingleprice] = useState(0);
  const [singlesummary, setSinglesummary] = useState("");
  const [singlephotos, setSinglephotos] = useState([]);

  const [elegantname, setElegantname] = useState("");
  const [elegantprice, setElegantprice] = useState(0);
  const [elegantsummary, setElegantsummary] = useState("");
  const [elegantphotos, setElegantphotos] = useState([]);

  const [classiquename, setClassiquename] = useState("");
  const [classiqueprice, setClassiqueprice] = useState(0);
  const [classiquesummary, setClassiquesummary] = useState("");
  const [classiquephotos, setClassiquephotos] = useState([]);

  const [deluxename, setDeluxename] = useState("");
  const [deluxeprice, setDeluxeprice] = useState(0);
  const [deluxesummary, setDeluxesummary] = useState("");
  const [deluxephotos, setDeluxephotos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("singlename", singlename);
    formData.append("singleprice", singleprice);
    formData.append("singlesummary", singlesummary);

    for (const photo of Object(singlephotos)) {
      formData.append("singlephotos", photo);
    }

    formData.append("elegantname", elegantname);
    formData.append("elegantprice", elegantprice);
    formData.append("elegantsummary", elegantsummary);

    for (const photo of Object(elegantphotos)) {
      formData.append("elegantphotos", photo);
    }

    formData.append("classiquename", classiquename);
    formData.append("classiqueprice", classiqueprice);
    formData.append("classiquesummary", classiquesummary);

    for (const photo of Object(classiquephotos)) {
      formData.append("classiquephotos", photo);
    }

    formData.append("deluxename", deluxename);
    formData.append("deluxeprice", deluxeprice);
    formData.append("deluxesummary", deluxesummary);

    for (const photo of Object(deluxephotos)) {
      formData.append("deluxephotos", photo);
    }

    const data = await uploadBuoquet(
      "http://localhost:8800/api/buoquets",
      formData
    );
    if (data?.status === "success") setStatus(data?.status === "success");
  };

  status && setTimeout(() => setStatus(false), 2500);

  return (
    <div className="bupload">
      {status && <p className="message success"> Buoquet has been created</p>}
      <div className="bupload__container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            onChange={(e) => setSinglename(e.target.value)}
            type="text"
            className="bupload__input"
            name="singlename"
            placeholder="write the single name"
          />
          <input
            onChange={(e) => setSingleprice(e.target.value)}
            type="number"
            className="bupload__input"
            name="singleprice"
            placeholder="write the single price"
          />
          <input
            onChange={(e) => setSinglesummary(e.target.value)}
            type="text"
            className="bupload__input"
            name="singlesummary"
            placeholder="write the single summary"
          />
          <input
            onChange={(e) => setSinglephotos(e.target.files)}
            type="file"
            className="bupload__input bupload__hidden"
            name="singlephotos"
            id="singlePhotos"
            placeholder="write the single name"
            multiple
          />

          <label htmlFor="singlePhotos">Choose single's photos</label>

          <input
            onChange={(e) => setElegantname(e.target.value)}
            type="text"
            className="bupload__input"
            name="elegantname"
            placeholder="write the elegant name"
          />
          <input
            onChange={(e) => setElegantprice(e.target.value)}
            type="number"
            className="bupload__input"
            name="elegantprice"
            placeholder="write the elegante price"
          />
          <input
            onChange={(e) => setElegantsummary(e.target.value)}
            type="text"
            className="bupload__input"
            name="elegantesummary"
            placeholder="write the elegante summary"
          />
          <input
            onChange={(e) => setElegantphotos(e.target.files)}
            type="file"
            className="bupload__input bupload__hidden"
            name="elegantephotos"
            id="elegantPhotos"
            placeholder="write the elegante name"
            multiple
          />

          <label htmlFor="elegantPhotos">Choose elegant's photos</label>

          <input
            onChange={(e) => setClassiquename(e.target.value)}
            type="text"
            className="bupload__input"
            name="classiquename"
            placeholder="write the classique name"
          />
          <input
            onChange={(e) => setClassiqueprice(e.target.value)}
            type="number"
            className="bupload__input"
            name="classiquename"
            placeholder="write the classique price"
          />
          <input
            onChange={(e) => setClassiquesummary(e.target.value)}
            type="text"
            className="bupload__input"
            name="classiquename"
            placeholder="write the classique summary"
          />
          <input
            onChange={(e) => setClassiquephotos(e.target.files)}
            type="file"
            className="bupload__input bupload__hidden"
            name="classiquename"
            id="classiquephotos"
            multiple
            placeholder="write the classique name"
          />

          <label htmlFor="classiquephotos">Choose classique's photos</label>

          <input
            onChange={(e) => setDeluxename(e.target.value)}
            type="text"
            className="bupload__input"
            name="deluxename"
            placeholder="write the deluxe name"
          />
          <input
            onChange={(e) => setDeluxeprice(e.target.value)}
            type="number"
            className="bupload__input"
            name="deluxename"
            placeholder="write the deluxe price"
          />
          <input
            onChange={(e) => setDeluxesummary(e.target.value)}
            type="text"
            className="bupload__input"
            name="deluxename"
            placeholder="write the deluxe summary"
          />
          <input
            onChange={(e) => setDeluxephotos(e.target.files)}
            type="file"
            className="bupload__input bupload__hidden"
            name="deluxename"
            id="deluxephotos"
            placeholder="write the deluxe name"
            multiple
          />
          <label htmlFor="deluxephotos">Choose deluxe's photos</label>
          <button className="bupload__btn">upload</button>
        </form>
      </div>
    </div>
  );
};

export default BuoquetUpload;
