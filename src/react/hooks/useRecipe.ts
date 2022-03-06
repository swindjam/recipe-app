import { useReducer } from 'react';
import Ingredient from '../../types/Ingredient';
import Recipe from '../../types/Recipe';
import recipeReducer from './recipeReducer';

export default function useRecipe(defaultRecipe: Recipe) {

    const [recipe, updateRecipe] = useReducer(recipeReducer, defaultRecipe);

    return [
        recipe,
        (property: string, value: string | number) => {
            updateRecipe({
                type: 'update',
                property,
                value
            });
        },
        (ingredient: Ingredient, index: number) => {
            updateRecipe({
                type: 'updateIngredient',
                index,
                ingredient,
                recipe: defaultRecipe
            });
        },
        (index: number) => {
            updateRecipe({
                type: 'removeIngredient',
                index
            });
        },
        () => {
            updateRecipe({
                type: 'reset',
                recipe: defaultRecipe
            });
        }
    ];
}