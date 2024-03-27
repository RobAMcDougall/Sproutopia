import React, { useContext, useState, useEffect } from "react";
import { RecipeContext } from "../../../context/RecipeContext";
import { example } from "../../../example";
import { useNavigate } from "react-router-dom";
const RecipeCard = () => {
  // get recipes from local storage
  const { ingredients } = useContext(RecipeContext);
  const [allRecipes, setAllRecipes] = useState(example);
  const [cuisineType, setCuisineType] = useState("");

  // split the ingredients array into a string
  let allIngredients = ingredients.join(",");

  // const getRecipesByIngredients = async() => {

  //   const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${allIngredients}&number=10&apiKey=1f6c8dec590648dea3f0d2d501385b28`);
  //   const data = await response.json();
  //   console.log(data)
  //   setAllRecipes(data);

  // }

  // get cuisine type
  const getCuisineType = async (title) => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/cuisine?apiKey=c4ca8f2e6eab44febc452055af5c53a9&title=${title}`
    );
    const data = await response.json();

    setCuisineType(data);
  };
  // useEffect(() => {
  //   getRecipesByIngredients();
  // }, [])

  const navigate = useNavigate();

  return (
    <>
      {allRecipes &&
        allRecipes.results.map((recipe) => (
          <div
            key={recipe.id}
            className="w-[200px] bg-[#DEF3C3] rounded-md cursor-pointer"
            onClick={() => navigate(`/recipes/${recipe.id}`)}
          >
            <img className="w-full" src={recipe.image} alt="recipe" />
            <div className="p-3">
              <h3 className="font-semibold text-sm mb-3">{recipe.title}</h3>
              {recipe.cuisines &&
                recipe.cuisines.map((cuisine) => (
                  <button
                    className="rounded-full bg-green-800 text-white px-2 text-sm mr-1"
                    key={cuisine.id}
                  >
                    {cuisine}
                  </button>
                ))}
              <p className="text-sm mt-3 font-medium">Missing:</p>
              {recipe.missedIngredients.map((ingredient) => (
                <button
                  className="rounded-full bg-red-300 px-2 text-sm mr-1"
                  key={ingredient.id}
                >
                  {ingredient.name}
                </button>
              ))}
            </div>
            {/* <span className='text-sm block'>Missing Ingredients: </span>
          {recipe.missedIngredients.map((ingredient) => (
            <button className='rounded-full bg-green-500 px-2 text-sm' key={ingredient.id}>{ingredient.name}</button>
          ))} */}
          </div>
        ))}
    </>
  );
};

export default RecipeCard;
