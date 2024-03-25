import React, { useContext } from 'react'
import SideNav from '../components/Kitchen/SideNav'
import RecipeList from '../components/Kitchen/RecipeList'
import AddIngredientsModal from '../components/Header/Shared/AddIngredientsModal'

const RecipeListPage = () => {
  return (
    <div>
      <div className='ml-96 mt-20 mr-24'>
        <AddIngredientsModal />
        <h1 className='font-semibold text-2xl mb-5'>Recipes</h1>
        <RecipeList />
      </div>
    </div>
  )
}

export default RecipeListPage