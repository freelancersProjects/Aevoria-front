import React from "react";
import "./CategoryCard.scss";
import ArrowCategorie from "../../../../dist/assets/svg/arrowCategorie.svg";

const CategoryCard = ({ image, title }) => {
  return (
    <div className="category-card">
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

export default CategoryCard;
