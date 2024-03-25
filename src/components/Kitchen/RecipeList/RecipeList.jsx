import React from "react";
import RecipeCard from "../RecipeCard/RecipeCard";

const RecipeList = () => {
  return (
    <div className="flex flex-wrap gap-7">
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
    </div>
  );
};

export default RecipeList;
