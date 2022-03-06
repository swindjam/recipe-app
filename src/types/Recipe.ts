import Ingredient from './Ingredient';

export default interface Recipe {
    name: string;
    ingredients: Ingredient[];
    method: string;
    steps: string[];
};