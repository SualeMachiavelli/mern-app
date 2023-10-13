import React from "react";

const Product = ({ state }) => {
  const handleImageChange = (e) => {
    // e.target.className("changer");
    e.target.classList.toggle("product__view");
  };
  return (
    <div className="product">
      <div className="product__gallery">
        {state?.images.map((image, i) => (
          <img
            onClick={handleImageChange}
            key={i}
            className={`product__photo product__${i + 1}`}
            src={`/${image.filePath}`}
            alt={image.fileName}
          />
        ))}

        {/* <img
          className="product__photo product__5"
          src="https://images.unsplash.com/photo-1534211698458-e2be12c1a94c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZsb3dlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          alt=""
        /> */}
      </div>
    </div>
  );
};

export default Product;
