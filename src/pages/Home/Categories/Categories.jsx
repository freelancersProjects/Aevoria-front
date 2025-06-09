import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from "../../../hooks/useFetch";
import CategoryCard from "../../../components/AEV/AEV.CategoriesCard/CategoryCard";
import "./Categories.scss";

function Categories() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetch("/genres");

  if (isLoading) {
    return <div className="categories loading">Chargement des catégories...</div>;
  }

  if (error) {
    return <div className="categories error">Erreur de chargement des catégories</div>;
  }

  const genres = data?.$values || [];

  const handleCategoryClick = (genreId) => {
    navigate(`/categorie/${genreId}`);
  };

  return (
    <div className="categories">
      {genres.map((genre) => (
        <CategoryCard
          key={genre.genreId}
          title={genre.name}
          image={genre.imageUrl}
          onClick={() => handleCategoryClick(genre.genreId)}
        />
      ))}
    </div>
  );
}

export default Categories;
