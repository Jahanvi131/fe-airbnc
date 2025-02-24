import React from "react";

const Image_Gallery = ({ images }) => {
  return (
    <div className="gallery-container">
      <div className="gallery">
        <img
          src={images[0]}
          alt="Main view of property"
          className="main-image"
        />
        {images.map((img, i) => {
          return <img key={i} src={img} alt="view of property" />;
        })}
      </div>
    </div>
  );
};

export default Image_Gallery;
