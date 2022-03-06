import {Request, Response} from 'express';
import DataSource from '../../types/DataSource';

export default (dataSource: DataSource) => (req: Request, res: Response) => {
    dataSource.saveRecipe(req.body.recipe)
    res.end();
};