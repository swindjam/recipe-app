import { useReducer } from 'react';
import {Ingredient} from '../../types/Ingredient';
import {Recipe} from '../../types/Recipe';
import recipeReducer from './recipeReducer';

export default function useRecipe(defaultRecipe: Recipe): [
    Recipe,
    (property: string, value: string | number) => void,
    (ingredient: Ingredient, index: number) => void,
    (index: number) => void,
    () => void
] {
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
                ingredient
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