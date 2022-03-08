import mongoose, { Model } from 'mongoose';
import { compileFunction } from 'vm';
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

    async addRecipe(recipe: Recipe): Promise<void> {
        await this.recipeModel.create(recipe);
    }

    async updateRecipe(recipe: Recipe): Promise<void> {
        await this.recipeModel.findOneAndUpdate(recipe);
    }

    async deleteRecipe(name: string): Promise<void> {
        await this.recipeModel.deleteOne({ name });
    }

    async getRecipes(name: string | null, ingredient: string | null): Promise<Recipe[]> {
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
                'ingredients.name': ingredient
            };
        }

        const docs = await this.recipeModel.find(params);
        console.log('docs', docs);
        return docs.map((recipe: Recipe) => {
            return {
                name: recipe.name,
                ingredients: recipe.ingredients,
                steps: recipe.steps,
                method: recipe.steps.join('\n')
            };
        });
    }
}