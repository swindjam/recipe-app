import {Request, Response} from 'express';
import getRecipes from '../getRecipes';

export default (dataSource: DataSource) => (req: Request, res: Response) => {

    //  TODO get parameters and search recipes

    const recipes = getRecipes();
    res.end();
};