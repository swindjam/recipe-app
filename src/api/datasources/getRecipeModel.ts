import mongoose, { Model } from 'mongoose';
import { number } from 'prop-types';
import Recipe from '../../types/Recipe';

export default () : Model<Recipe> => {
    const Schema = mongoose.Schema;

    const Ingredient = new Schema({
        name: String,
        amount: Number,
        unit: String
    });
    const Recipe = new Schema({
        id: Number,
        name: String,
        ingredients: [Ingredient],
        steps: [String]
    });

    const RecipeModel = mongoose.model('Recipe', Recipe);
    return RecipeModel;
};