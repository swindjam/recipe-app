import {Recipe} from './Recipe';

export interface DataSource {
    addRecipe(recipe: Recipe) : Promise<void>;
    updateRecipe(recipe: Recipe) : Promise<void>;
    deleteRecipe(id: number) : Promise<void>;
    getRecipes(name: string | null, ingredient: string | null) : Promise<Recipe[]>;
};