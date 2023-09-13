import React from "react";
import "./style.scss";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const StarsReviewsLg = ({ stars, reviews }) => {
  const ratingStars = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar style={{ fontSize: 38, color: "orange" }} />
        ) : stars >= number ? (
          <FaStarHalfAlt
            style={{ fontSize: 36, color: "orange", paddingTop: 2 }}
          />
        ) : (
          <AiOutlineStar
            style={{ fontSize: 45, color: "orange", paddingBottom: 2 }}
          />
        )}
      </span>
    );
  });
  return (
    <>
      <div>
        <div className="d-flex justify-content-center mb-1">{ratingStars}</div>
        <strong>
          <i>
            <p
              className="mb-0 text-center text-success"
              style={{ fontSize: 24 }}
            >
              ( {reviews} đánh giá )
            </p>
          </i>
        </strong>
      </div>
    </>
  );
};

export default StarsReviewsLg;
