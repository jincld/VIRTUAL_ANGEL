import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Reviews.css";

const Reviews = () => {
  const { id } = useParams(); // Obtiene el ID del producto
  const [reviews, setReviews] = useState([]);

  // Cargar reseñas desde el backend
  useEffect(() => {
// Código de fetchReviews (en Reviews.js)
const fetchReviews = async () => {
  try {
    const response = await fetch(`http://localhost:3001/api/assessment/${id}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Error fetching reviews");

    const data = await response.json();
    setReviews(data);
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

    fetchReviews();
  }, [id]);
  

  if (reviews.length === 0) {
    return <p className="no-reviews">No reviews yet.</p>;
  }

  return (
    <div className="reviews-container">
      {reviews.map((review, index) => (
        <div key={index} className="review-box">
          <p className="user-name">{review.user_name}</p>
          <p className="stars">{"★".repeat(review.assessment)}{"☆".repeat(5 - review.rating)}</p>
          <p className="comment">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
