import React from "react";
import { Link } from "react-router-dom";
import './HomeCard.css';

function HomeCard({ title, description, link, image }) {
  return (
    <div className="homecard">
      <div className="homecard__content">
        <h2 className="header2">WELCOME TO VIRTUAL ANGEL</h2>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={`/${link}`} className="btn btn-dark btnhomecard">
          EXPLORE &rarr;
        </Link>
      </div>
      <div className="homecard__image">
        <img src={image} alt={title} />
      </div>
    </div>
  );
}

export default HomeCard;
