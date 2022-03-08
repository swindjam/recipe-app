import {Request, Response} from 'express';
import {DataSource} from '../../types/DataSource';

export default (dataSource: DataSource) => (req: Request, res: Response) => {
    dataSource.addRecipe(req.body.recipe);
    res.end();
};