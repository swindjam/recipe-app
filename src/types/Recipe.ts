import {Ingredient} from './Ingredient';

export interface Recipe {
    id?: number;
    name: string;
    ingredients: Ingredient[];
    method?: string;
    steps: string[];
};