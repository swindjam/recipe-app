import RecipeStateAction from '../../types/RecipeStateAction';
import Recipe from '../../types/Recipe';

export default (state: Recipe, action: RecipeStateAction): Recipe => {
    const { type, property, value, recipe, index, ingredient } = action;

    switch (type) {
        case 'update':
            if (property) {
                return {
                    ...state,
                    [property]: value
                };
            }
            return state;
        case 'updateIngredient':
            if (typeof index === 'number' && ingredient) {
                let newIngredients = state.ingredients.slice();
                const existingIngredient = (state.ingredients[index] || { name: '', amount: null, unit: '' })

                newIngredients[index] = {
                    ...existingIngredient,
                    ...ingredient
                };

                return {
                    ...state,
                    ingredients: newIngredients
                };
            }
            return state;
        case 'removeIngredient':
            if (typeof index === 'number') {
                return {
                    ...state,
                    ingredients: state.ingredients.slice(0, index + 1)
                };
            }
            return state;
        case 'reset':
            if (recipe) {
                return recipe;
            }
            return state;
        default:
            return state;
    }
}