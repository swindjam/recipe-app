import {Ingredient} from './Ingredient';
import {Recipe} from './Recipe';

export interface RecipeStateAction {
    type: string;
    property?: string;
    value?: string | number;
    recipe?: Recipe;
    ingredient?: Ingredient;
    index?: number;
};