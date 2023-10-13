import React, { useEffect, useState } from "react";
import ApiFetch, { uploadFlower } from "../ApiFetch";

const Upload = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [family, setFamily] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("family", family);
    formData.append("description", description);

    for (const image of Object(images)) {
      formData.append("images", image);
    }
    await uploadFlower(formData);
  };

  return (
    <div className="upload">
      <h2>Uploading flower</h2>
      <form
        className="upload__form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <input
          name="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="upload__input"
          placeholder="name of flower"
        />
        <input
          name="price"
          type="text"
          onChange={(e) => setPrice(e.target.value)}
          className="upload__input"
          placeholder="price of flower"
        />
        <input
          type="text"
          name="description"
          className="upload__input"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description of flower"
        />
        <input
          type="text"
          name="family"
          onChange={(e) => setFamily(e.target.value)}
          className="upload__input"
          placeholder="family of flower"
        />
        {/* <input
          type="text"
          className="upload__input"
          placeholder="family of flower"
        /> */}
        <input
          type="file"
          name="images"
          onChange={(e) => setImages(e.target.files)}
          className="upload__input upload__hidden"
          multiple
          id="images"
        />
        <label htmlFor="images">Choose images</label>
        <button className="upload__btn btn">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
