import React, { useEffect, useState } from "react";

const Image_Gallery = ({ images }) => {
  const [propImages, setPropImages] = useState(images);
  useEffect(() => {
    setPropImages(images.slice(1));
  }, [images]);
  return (
    <div className="gallery-container">
      <div className="gallery">
        <img
          src={images[0]}
          alt="Main view of property"
          className="main-image"
        />
        {propImages.map((img, i) => {
          return <img key={i} src={img} alt="view of property" />;
        })}
      </div>
    </div>
  );
};

export default Image_Gallery;
