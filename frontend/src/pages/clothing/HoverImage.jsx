import React, { useState } from 'react';
import './HoverImage.css'; // crea este archivo o pon el CSS en tu main

const HoverImage = ({ src1, src2, alt }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="hover-image-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={src1} alt={alt} className={`image ${isHovered ? 'fade-out' : 'fade-in'}`} />
      <img src={src2} alt={alt} className={`image top-layer ${isHovered ? 'fade-in' : 'fade-out'}`} />
    </div>
  );
};

export default HoverImage;
