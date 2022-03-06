import {Request, Response} from 'express';
import DataSource from '../../types/DataSource';

export default (dataSource: DataSource) =>  (req: Request, res: Response) => {
    dataSource.deleteRecipe(req.body.recipe_name);
    res.end();
};