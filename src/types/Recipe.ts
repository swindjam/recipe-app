import Ingredient from './Ingredient';

export default interface Recipe {
    id?: number;
    name: string;
    ingredients: Ingredient[];
    method?: string;
    steps: string[];
};