import mongoose, { Model } from 'mongoose';
import DataSource from "../../types/DataSource";
import Recipe from '../../types/Recipe';
import getRecipeModel from './getRecipeModel';

export default class MongoDataSource implements DataSource {

    protected recipeModel: Model<Recipe>;

    constructor() {
        this.connectToDB();
        this.recipeModel = getRecipeModel();
    }

    async connectToDB(): Promise<void> {
        const config = {
            url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
            user: process.env.DB_USER,
            pwd: process.env.DB_PASSWORD
        };

        try {
            console.log('Connecting to DB', config);
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

    async saveRecipe(recipe: Recipe): Promise<void> {
        console.log('save recipe')
        const recipeModel = this.recipeModel;

        console.log('Saving recipe', recipe);

        await recipeModel.create(recipe);
        console.log('Recipe saved');
    }

    async deleteRecipe(name: string): Promise<void> {
        const recipeModel = this.recipeModel;

        console.log('Deleting recipe', name);
        const recipes = await recipeModel.find({
            name
        });
        console.log('found recipes', recipes)
        for (const recipe in recipes) {
            await recipeModel.remove(recipe);
        }

        console.log('Recipe(s) deleted');
    }

    async getRecipes(name: string | null, ingredient: string | null): Promise<Recipe[]> {
        const recipeModel = this.recipeModel;
        let params = {};
        if (name) {
            params = {
                ...params,
                name
            };
        }
        if (ingredient) {
            params = {
                ...params,
                ingredient
            };
        }

        console.log('Searching for recipes');
        const docs = await recipeModel.find(params);

        return docs;
    }
}