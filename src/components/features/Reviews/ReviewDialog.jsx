import React, { useState } from "react";
import Button from "../../common/Button";
import "../../common/button.css";

const ReviewDialog = ({ isOpen, onClose, onSubmit, propertyName }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleSubmitReview = () => {
    // Call the provided onSubmit with rating and comment
    onSubmit({ rating, comment });

    // Reset form
    setRating(0);
    setComment("");

    // Close the dialog
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Post a Review for {propertyName}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col items-center mb-4">
          <label className="mb-2 text-sm font-medium">Your Rating</label>
          <div
            className="flex space-x-2"
            onMouseLeave={() => setHoveredRating(0)}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                className="focus:outline-none"
              >
                <span
                  className="text-2xl"
                  style={{
                    color:
                      (hoveredRating || rating) >= star ? "#FFD700" : "#D1D5DB",
                  }}
                >
                  ★
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block mb-2 text-sm font-medium">
            Your Review
          </label>
          <textarea
            id="comment"
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            onClick={handleSubmitReview}
            disabled={!rating || !comment.trim()}
            // className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
            //   !rating || !comment.trim()
            //     ? "bg-blue-400 cursor-not-allowed"
            //     : "bg-blue-600 hover:bg-blue-700"
            // }`}
          >
            Submit Review
          </Button>
          <Button onClick={onClose} className="buttonCancel">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDialog;
