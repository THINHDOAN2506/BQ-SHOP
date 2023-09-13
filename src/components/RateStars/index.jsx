import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";

const RateStars = ({ count, rating, color, onRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const getColor = (index) => {
    if (hoverRating >= index) {
      return color.filled;
    } else if (!hoverRating && rating >= index) {
      return color.filled;
    }

    return color.unfilled;
  };

  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <FaStar
          key={idx}
          onClick={() => onRating(idx)}
          style={{ color: getColor(idx), cursor: "pointer", fontSize: 22 }}
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, rating, hoverRating]);

  return <div>{starRating}</div>;
};

RateStars.propTypes = {
  count: PropTypes.number,
  rating: PropTypes.number,
  onChange: PropTypes.func,
  color: {
    filled: PropTypes.string,
    unfilled: PropTypes.string,
  },
};

RateStars.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    filled: "#FFC027",
    unfilled: "#DCDCDC",
  },
};

export default RateStars;
