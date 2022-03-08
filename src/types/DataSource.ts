import Recipe from "./Recipe";

export default interface DataSource {
    addRecipe(recipe: Recipe) : Promise<void>;
    updateRecipe(recipe: Recipe) : Promise<void>;
    deleteRecipe(name: string) : Promise<void>;
    getRecipes(name: string | null, ingredient: string | null) : Promise<Recipe[]>;
};