import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const RecipeList = () => {
    const [recipeInformation, setRecipeInformation] = useState([]);

    const {id} = useParams();
    
      const getRecipeInformation = async () => {
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=501fcf21715c4fa7bfdc19da10e58dc4`);
        const data = await response.json();
        setRecipeInformation(data);
      }

       
      useEffect(() => {
        getRecipeInformation();
      }, [])
  return (
    <div className=''>
        <h1 className='ml-[22rem] mt-16 font-medium text-2xl mb-7'>{recipeInformation.title}</h1>
        <div className='grid  grid-cols-[400px_minmax(700px,_1fr)_100px] gap-7 ml-[22rem] mr-[3rem]'>
            <div className='bg-[#DEF3C3] rounded-xl p-6'>
                <h3>Ingredients</h3>
                <ul>
                    {recipeInformation.extendedIngredients && recipeInformation.extendedIngredients.map((ingredient) => (
                        <li className='list-disc' key={ingredient.id}>{ingredient.original}</li>
                    ))}
                </ul>
            </div>
            <div className='bg-[#DEF3C3] rounded-xl p-6'>
                <h3>Instructions</h3>
                <ol> 
                {recipeInformation.analyzedInstructions && recipeInformation.analyzedInstructions[0].steps.map((step) => (
                    <li className='list-decimal' key={step.number}>{step.step}</li>
                ))}
                </ol>
            </div>
        </div>
    </div>
  )
}

export default RecipeList