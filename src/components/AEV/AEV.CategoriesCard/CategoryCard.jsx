import React from "react";
import "./CategoryCard.scss";

const CategoryCard = ({ image, title }) => {
  return (
    <div className="category-card">
      <img src={image} alt={title} className="category-image" />
      <div className="category-overlay">
        <h3>{title}</h3>
        <span>→</span>
      </div>
    </div>
  );
};

export default CategoryCard;
