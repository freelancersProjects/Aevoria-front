import React from "react";
import CategoryCard from "../../components/AEV/AEV.CategoriesCard/CategoryCard";
import "./Categories.scss";

const categories = [
  { title: "FPS", image: "/assets/images/photo-test.webp" },
  { title: "Jeux solo", image: "/assets/images/photo-test.webp" },
  { title: "Stratégie", image: "/assets/images/photo-test.webp" },
  { title: "Simulation", image: "/assets/images/photo-test.webp" },
  { title: "Sport", image: "/assets/images/photo-test.webp" },
  { title: "Jeux Multijoueur", image: "/assets/images/photo-test.webp" },
  { title: "Horreur", image: "/assets/images/photo-test.webp" },
  { title: "Course", image: "/assets/images/photo-test.webp" },
];

const Categories = () => {
  return (
    <div className="categories">
      {categories.map((cat, index) => (
        <CategoryCard key={index} title={cat.title} image={cat.image} />
      ))}
    </div>
  );
};

export default Categories;
