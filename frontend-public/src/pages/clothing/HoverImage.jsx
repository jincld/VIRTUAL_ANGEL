import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HoverImage.css';

const HoverImage = ({ src1, src2, alt, href }) => {
  const [isHovered, setIsHovered] = useState(false);

  const imageContent = (
    <div
      className="hover-image-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={src1} alt={alt} className={`image ${isHovered ? 'fade-out' : 'fade-in'}`} />
      <img src={src2} alt={alt} className={`image top-layer ${isHovered ? 'fade-in' : 'fade-out'}`} />
    </div>
  );

  return href ? <Link to={href}>{imageContent}</Link> : imageContent;
};

export default HoverImage;
