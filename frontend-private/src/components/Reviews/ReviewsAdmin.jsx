import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Reviews.css";
import { toast } from 'react-hot-toast';

const ReviewsAdmin = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/assessment", {
          withCredentials: true,
        });
        const filtered = res.data.filter((review) => review.idProducts === id);
        setReviews(filtered);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  const confirmDelete = (reviewId) => {
    setSelectedReviewId(reviewId);
    setShowModal(true);
  };

const handleDeleteConfirmed = async () => {
  try {
    await axios.delete(`http://localhost:3001/api/assessment/${selectedReviewId}`, {
      withCredentials: true,
    });
    setReviews((prev) => prev.filter((r) => r._id !== selectedReviewId));

    // Mostrar alerta de éxito
    toast.success('Review deleted successfully');
  } catch (error) {
    console.error("Error deleting review:", error);
    toast.error('Failed to delete the review');
  } finally {
    setShowModal(false);
    setSelectedReviewId(null);
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
            onClick={() => confirmDelete(review._id)}
          >
            DELETE REVIEW
          </button>
        </div>
      ))}

      {showModal && (
        <div className="ar-modal-overlay">
          <div className="ar-modal-box">
            <h3 className="ar-modal-title">Confirm Deletion</h3>
            <p className="ar-modal-message">Are you sure you want to delete this review?</p>
            <div className="ar-modal-buttons">
              <button className="btn ar-cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn ar-confirm-btn" onClick={handleDeleteConfirmed}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsAdmin;
