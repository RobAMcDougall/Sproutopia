import { createContext, useState } from "react";

export const RecipeContext = createContext();

// Path: src/context/RecipeContext.jsx
export const RecipeProvider = ({ children }) => {
    const [ingredients, setIngredients] = useState(["pasta", "tomato", "cheese"]);
    
   
    return (
        <RecipeContext.Provider value={{ ingredients, setIngredients }}>
        {children}
        </RecipeContext.Provider>
    );
    };