import React from "react";
import PropTypes from "prop-types";
import "./CategoryCard.scss";
import ArrowCategorie from "../../../assets/svg/arrowCategorie.svg";

const CategoryCard = ({ image, title, onClick }) => {
  return (
    <div className="category-card" onClick={onClick}>
      <img src={image} alt={title} className="category-image" />
      <div className="category-overlay">
        <div className="category-title">
          <h3>{title}</h3>
          <img src={ArrowCategorie} alt="Arrow" className="arrow-icon" />
        </div>
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default CategoryCard;
