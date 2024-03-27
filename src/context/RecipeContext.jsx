import { createContext, useState } from "react";

export const RecipeContext = createContext();

// Path: src/context/RecipeContext.jsx
export const RecipeProvider = ({ children }) => {
    const [ingredients, setIngredients] = useState([]);

    const [allRecipes, setAllRecipes] = useState(null);
    
   const [intolerances, setIntolerances] = useState(["gluten", "peanut"]);
   const [open, setOpen] = useState(false)
   
    return (
        <RecipeContext.Provider value={{ ingredients, setIngredients, intolerances, setIntolerances, open, setOpen, allRecipes, setAllRecipes }}>
        {children}
        </RecipeContext.Provider>
    );
    };