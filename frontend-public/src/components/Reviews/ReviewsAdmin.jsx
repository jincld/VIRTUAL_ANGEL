import React from "react";
import { useParams } from "react-router-dom"; // Aquí agregamos useParams
import reviewsData from "./ReviewsData";
import "./Reviews.css";

const Reviews = () => {
  const { id } = useParams(); // Toma el id de la URL automáticamente

  // Filtrar las reseñas correspondientes al producto
  const productReviews = reviewsData.filter(r => r.productId === id);

  if (productReviews.length === 0) {
    return <p className="no-reviews">No reviews yet.</p>;
  }

  return (
    <div className="reviews-container">
      {productReviews.map((review, index) => (
        <div key={index} className="review-box">
          <p className="user-name">{review.user}</p>
          <p className="stars">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
          <p className="comment">{review.comment}</p>
          <button className="btn btndeletereview">DELETE REVIEW</button>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
