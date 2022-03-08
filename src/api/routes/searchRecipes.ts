import {Request, Response} from 'express';
import {DataSource} from '../../types/DataSource';

export default (dataSource: DataSource) => async (req: Request, res: Response) => {

    // Get parameters for the query, then use that to search for recipes
    const name = req.query.recipe_name;
    const ingredient = req.query.ingredient;
    const recipes = await dataSource.getRecipes(name ? String(name) : null, ingredient ? String(ingredient) : null);

    res.json({
        recipes
    });
};