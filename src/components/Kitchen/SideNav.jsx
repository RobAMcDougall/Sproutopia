import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { RecipeContext } from '../../context/RecipeContext'
import { example2 } from '../../example2'
import { example } from '../../example'
 

const SideNav = () => {
  const {ingredients, setOpen, setIntolerances, intolerances, setAllRecipes} = useContext(RecipeContext)

  const upperCaseIngredient = ingredient => {
    return ingredient.charAt(0).toUpperCase() + ingredient.slice(1)
  }

  const addIngredient = () => {

     setOpen(true)
  }

  
  const addDietaryRequirement = (e) => {
    if(e.target.checked) {
      setIntolerances([...intolerances, e.target.name])
    }
  }

  const addDietary = () => {
    setAllRecipes(example2)
  }

  const navigate = useNavigate() 

   
  return (
    <>
    <Outlet />
    
    <div className='absolute top-16 left-0 bg-[#DEF3C3] w-[300px] py-7 px-5 min-h-screen'>
        <h3 className='text-lg font-medium'>Add ingredients</h3>
        <div className='mt-3'>
            <div className='flex flex-wrap gap-3'> 
            {ingredients.length > 0 ?ingredients.map((ingredient) => (
                <button key={ingredient} className='bg-white border border-gray-400 rounded-md py-1 px-8 text-sm'>{upperCaseIngredient(ingredient)}</button>
            )): <p className='text-sm'>No ingredients added.</p>}
       
        </div>
        <button onClick={addIngredient} className='font-medium text-sm mt-4'>+ Add More</button>
        </div>
        <div className='mt-9'>
            <h3 className='font-medium'>Recent harvest from your garden</h3>
            <div className='flex flex-wrap gap-3 mt-3'> 
        
        <button className='bg-white border border-gray-400 rounded-md py-1 px-8 text-sm'>Tomato</button>
        </div>
        </div>
        <div className='mt-10'>
            <h3 className='font-medium mb-2'>Dietary Requirements</h3>
            <div className='block'> 
            <input type='checkbox' onChange={() => setAllRecipes(example)} name='gluten' className='ml-2'/>
            <label className='ml-2'>Gluten</label>
            </div>
            <div className='block'> 
            <input type='checkbox' className='ml-2' onChange={addDietaryRequirement} name='diary'/>
            <label className='ml-2'>Dairy</label>
            </div>
            <div className='block'> 
            <input type='checkbox' className='ml-2' onChange={addDietary} name='egg'/>
            <label className='ml-2'>Egg</label>
            </div>
            <div className='block'> 
            <input type='checkbox' className='ml-2' onChange={addDietaryRequirement} name='grain' />
            <label className='ml-2'>Grain</label>
            </div>
            <div className='block'> 
            <input type='checkbox' className='ml-2' onChange={addDietaryRequirement} name='peanut' />
            <label className='ml-2'>Peanut</label>
            </div>
            <div className='block'> 
            <input type='checkbox' className='ml-2' onChange={addDietaryRequirement} name='seafood' />
            <label className='ml-2'>Seafood</label>
            </div>
            <div className='block'> 
            <input type='checkbox' className='ml-2' onChange={addDietaryRequirement} name='sesame' />
            <label className='ml-2'>Sesame</label>
            </div>
            <div className='block'> 
            <input type='checkbox' className='ml-2' onChange={addDietaryRequirement} name='shellfish' />
            <label className='ml-2'>Shellfish</label>
            </div>
            <div className='block'> 
            <input type='checkbox' className='ml-2' onChange={addDietaryRequirement} name='soy' />
            <label className='ml-2'>Soy</label>
            </div>
            <div className='block'> 
            <input type='checkbox' className='ml-2' onChange={addDietaryRequirement} name='sulfite' />
            <label className='ml-2'>Sulfite</label>
            </div>
            <div className='block'> 
            <input type='checkbox' className='ml-2' onChange={addDietaryRequirement} name='tree nut' />
            <label className='ml-2'>Tree Nut</label>
            </div>
            <div className='block'> 
            <input type='checkbox' className='ml-2' onChange={addDietaryRequirement} name='wheat' />
            <label className='ml-2'>Wheat</label>
            </div>
            <button onClick={() => navigate("/recipes")} className='bg-[#2D5039] text-white py-1 px-3 rounded-md mt-3'>Let's cook</button>
        </div>
         
    </div>
    </>
  )
}

export default SideNav