import { createContext, useState } from "react";

export const RecipeContext = createContext();

// Path: src/context/RecipeContext.jsx
export const RecipeProvider = ({ children }) => {
    const [ingredients, setIngredients] = useState(["pasta", "tomato", "cheese"]);
    
   const [intolerances, setIntolerances] = useState(["gluten", "peanut"]);
   const [open, setOpen] = useState(false)
   

    return (
        <RecipeContext.Provider value={{ ingredients, setIngredients, intolerances, setIntolerances, open, setOpen }}>
        {children}
        </RecipeContext.Provider>
    );
    };