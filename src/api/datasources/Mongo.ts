import mongoose from 'mongoose';
import DataSource from "../../types/DataSource";
import Recipe from '../../types/Recipe';

export default class MongoDataSource implements DataSource {

    constructor() {
        this.connectToDB();
    }

    async connectToDB(): Promise<void> {
        const {
            DB_USER,
            DB_PASSWORD,
            DB_HOST,
            DB_PORT,
            DB_NAME,
        } = process.env;

        const config = {
            url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
            user: DB_USER,
            pwd: DB_PASSWORD
        };

        try {
            await mongoose.connect(
                config.url,
                {
                    user: config.user,
                    pass: config.pwd
                }
            );
        } catch (e) {
            console.log(`Failed to connect to DB - ${e}`);
        }
    }

    getRecipeModel() {
        const Schema = mongoose.Schema;

        const Ingredient = new Schema({
            name: String,
            amount: Number,
            unit: String
        });
        const Recipe = new Schema({
            name: String,
            ingredients: [Ingredient],
            steps: [String]
        });

        const RecipeModel = mongoose.model('Recipe', Recipe);
        return RecipeModel;
    }

    async saveRecipe(recipe: Recipe): Promise<void> {
        const RecipeModel = this.getRecipeModel();
        const recipeToSave = new RecipeModel();
        recipeToSave.name = recipe.name;
        recipeToSave.ingredients = recipe.ingredients;
        recipeToSave.steps = recipe.steps;

        await recipeToSave.save();
        console.log('Recipe saved');
    }

    async deleteRecipe(name: string): Promise<void> {
        const RecipeModel = this.getRecipeModel();
        await RecipeModel.findByIdAndRemove(name);
        console.log('Recipe deleted');
    }

    async getRecipes(name: string | null, ingredient: string | null): Promise<Recipe[]> {
        const RecipeModel = this.getRecipeModel();
        const docs = await RecipeModel.find({
            name,
            ingredient
        });

        return docs;
    }
}