import React from "react";
import CategoryCard from "../../../components/AEV/AEV.CategoriesCard/CategoryCard";
import "./Categories.scss";

const categories = [
  { title: "FPS", image: "/src/assets/images/photo-test.webp" },
  { title: "Jeux solo", image: "/src/assets/images/photo-test.webp" },
  { title: "Stratégie", image: "/src/assets/images/photo-test.webp" },
  { title: "Simulation", image: "/src/assets/images/photo-test.webp" },
  { title: "Sport", image: "/src/assets/images/photo-test.webp" },
  { title: "Jeux Multijoueur", image: "/src/assets/images/photo-test.webp" },
  { title: "Horreur", image: "/src/assets/images/photo-test.webp" },
  { title: "Course", image: "/src/assets/images/photo-test.webp" },
  { title: "RPG", image: "/src/assets/images/photo-test.webp" },
  { title: "Aventure", image: "/src/assets/images/photo-test.webp" },
  { title: "Action", image: "/src/assets/images/photo-test.webp" },
  { title: "Combat", image: "/src/assets/images/photo-test.webp" },
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
