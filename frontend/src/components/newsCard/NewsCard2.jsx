import React from "react";
import { Link } from "react-router-dom";
import './NewsCard2.css';

function NewsCard2({ title, description, link, image }) {
  return (
    <div className="news-card">
      <div className="news-card__content">
        <h2 className="header2">NEW IN</h2>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={`/${link}`} className="btn btn-dark btnnews">
        EXPLORE &rarr;
        </Link>
      </div>
      <div className="news-card__image">
        <img src={image} alt={title} />
      </div>
    </div>
  );
}

export default NewsCard2;