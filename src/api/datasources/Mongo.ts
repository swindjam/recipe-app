import mongoose, { Model } from 'mongoose';
import { Logger } from 'winston';
import DataSource from "../../types/DataSource";
import Recipe from '../../types/Recipe';
import getRecipeModel from './getRecipeModel';

interface Config {
    url: string;
    user: string;
    pwd: string;
}

export default class MongoDataSource implements DataSource {

    protected recipeModel: Model<Recipe>;
    protected logger: Logger;
    protected config: Config;

    constructor(logger: Logger) {
        this.config = {
            url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
            user: String(process.env.DB_USER),
            pwd: String(process.env.DB_PASSWORD)
        };
        this.logger = logger;
        this.connectToDB();
        this.recipeModel = getRecipeModel();
    }

    async connectToDB(): Promise<void> {
        try {
            this.logger.log('info', 'Connecting to DB', this.config);
            await mongoose.connect(
                this.config.url,
                {
                    user: this.config.user,
                    pass: this.config.pwd
                }
            );
        } catch (e) {
            this.logger.log('info', `Failed to connect to DB - ${e}`, {});
        }
    }

    async disconnectFromDB() : Promise<void> {
        await mongoose.disconnect();
        this.logger.log('info', 'Disconnected from DB', {});
    }

    async addRecipe(recipe: Recipe): Promise<void> {
        const id = new mongoose.Types.ObjectId().id;

console.log('id', id)

        await this.recipeModel.create(recipe);
    }

    async updateRecipe(recipe: Recipe): Promise<void> {
        await this.recipeModel.findOneAndUpdate(recipe);
    }

    async deleteRecipe(id: number): Promise<void> {
        await this.recipeModel.deleteOne({ id });
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
        return docs.map((recipe: Recipe) => {
            return {
                id: recipe.id,
                name: recipe.name,
                ingredients: recipe.ingredients,
                steps: recipe.steps,
                method: recipe.steps.join('\n')
            };
        });
    }
}