import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Reviews.css";

const ReviewsAdmin = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar las reviews del producto
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/assessment", {
          withCredentials: true,
        });
        // Filtra por el id del producto
        const filtered = res.data.filter(
          (review) => review.idProducts === id
        );
        setReviews(filtered);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  // Eliminar review con confirmación
  const handleDelete = async (reviewId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this review?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/api/assessment/${reviewId}`, {
        withCredentials: true,
      });
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  if (loading) return <p>Loading reviews...</p>;
  if (reviews.length === 0) return <p className="no-reviews">No reviews yet.</p>;

  return (
    <div className="reviews-container">
      {reviews.map((review) => (
        <div key={review._id} className="review-box">
          <p className="user-name">{review.idCustomer?.name || "Unknown user"}</p>
          <p className="stars">
            {"★".repeat(review.assessment)}{"☆".repeat(5 - review.assessment)}
          </p>
          <p className="comment">{review.comment}</p>
          <button
            className="btn btndeletereview"
            onClick={() => handleDelete(review._id)}
          >
            DELETE REVIEW
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReviewsAdmin;
