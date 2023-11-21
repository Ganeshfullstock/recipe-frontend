import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedrecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserID();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                  const response = await axios.get("https://recipe01-backend.onrender.com/recipes");
                  setRecipes(response.data);
                           } catch (err) {
                             console.error(err);
                         }
        }
        const fetchSavedRecipe = async () => {
            try {
                  const response = await axios.get(
                    "https://recipe01-backend.onrender.com/recipes/savedRecipes/ids/",{userID}
                    );
                  setSavedRecipes(response.data.savedrecipes);
                           } catch (err) {
                             console.error(err);
                         }
        }
        fetchRecipe()
        fetchSavedRecipe();
    }, [userID]);

    const  saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put("https://recipe01-backend.onrender.com/recipes", {
                recipeID,
                userID
            });
            setSavedRecipes(response.data.savedRecipes);
            
                     } catch (err) {
                       console.error(err);
                   }
    }

    const isRecipeSaved = (id) => savedrecipes.includes(id);
    return (
    <div>
         <h2>Recipes</h2>
    <ul>
        {recipes.map ((recipe) => (
            <li key={recipe._id}>
                
                <div>
                    <h2>{recipe.name}</h2>
                    <button 
                    onClick={() => saveRecipe(recipe._id)} 
                     disabled ={isRecipeSaved(recipe._id)}>
                        {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                        </button>
                </div>
                <div className="instructions">
                    <p> {recipe.instructions}</p>
                </div>
                <img src={recipe.imageUrl} alt={recipe.name} />
                <p> CookingTime: {recipe.cookingTime} (minutes)</p>
            </li>
        ))
        }
        </ul>
        </div>
        )
};