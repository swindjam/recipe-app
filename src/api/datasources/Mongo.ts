import mongoose from 'mongoose';
import DataSource from "../../types/DataSource";
import Recipe from '../../types/Recipe';

export default class MongoDataSource implements DataSource {

    protected db;

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
            this.db = await mongoose.connect(
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
        console.log(this.db)

        const RecipeModel = this.getRecipeModel();
        const recipeToSave = new RecipeModel();
        recipeToSave.name = recipe.name;
        recipeToSave.ingredients = recipe.ingredients;
        recipeToSave.steps = recipe.steps;

        await recipeToSave.save();
        console.log('Recipe saved');
    }

    async deleteRecipe(name: string): Promise<void> {
        console.log(this.db)
    }

    async getRecipes(name: string | null, ingredient: string | null): Promise<Recipe[]> {
        console.log(this.db)

        const RecipeModel = this.getRecipeModel();
        const docs = await RecipeModel.find({
            name,
            ingredient
        });

        return docs;

        // const recipes = [
        //     {
        //         name: 'Cake',
        //         ingredients: [
        //             {
        //                 name: 'flour',
        //                 amount: 400,
        //                 unit: 'grams'
        //             },
        //             {
        //                 name: 'sugar',
        //                 amount: 200,
        //                 unit: 'grams'
        //             }
        //         ],
        //         steps: [
        //             'Mix in bowl',
        //             'Put in oven',
        //             'Cook for 20mins at 180c'
        //         ]
        //     }
        // ];
        // return recipes;
    }
}