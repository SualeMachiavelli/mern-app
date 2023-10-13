import React from "react";

const Gallery = ({ photos }) => {
  return (
    <div className="gallery">
      {photos.map((photo, i) => (
        <img
          key={i}
          src={`/${photo.filePath}`}
          alt={photo.fileName}
          className="gallery__photo"
        />
      ))}
    </div>
  );
};

export default Gallery;
