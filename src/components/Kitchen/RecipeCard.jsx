import React from 'react'

const RecipeCard = () => {
  return (
    <div className="w-[200px] bg-white">
        <img className='w-full' src="https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg" alt="recipe" />
        <div className='p-3'> 
        <h3 className='font-semibold text-sm mb-3'>Spaghetti Carbonara</h3>
        <span className='rounded-full bg-green-500 px-2 text-sm'>Italian</span>
        </div>
    </div>
  )
}

export default RecipeCard