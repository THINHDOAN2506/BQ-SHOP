import React from "react";
import "./style.scss";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const StarsReviews = ({ stars, reviews }) => {
  const ratingStars = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <div key={index} className="p-0">
        {stars >= index + 1 ? (
          <FaStar style={{ fontSize: 19, color: "orange" }} />
        ) : stars >= number ? (
          <FaStarHalfAlt style={{ fontSize: 18, color: "orange" }} />
        ) : (
          <AiOutlineStar
            style={{ fontSize: 23, color: "orange", marginTop: 2 }}
          />
        )}
      </div>
    );
  });
  return (
    <>
      <div>
        <div className="d-flex justify-content-center mb-1">{ratingStars}</div>
        <strong>
          <i>
            <p className="mb-0 text-center text-muted" style={{ fontSize: 15 }}>
              ( {reviews} đánh giá )
            </p>
          </i>
        </strong>
      </div>
    </>
  );
};

export default StarsReviews;
