import {renderToString} from 'react-dom/server';
import {Request, Response} from 'express';
import React from 'react';
import mustache from 'mustache';
import App from '../../react/App';
import template from '../template.html';
import DataSource from '../../types/DataSource';

export default (dataSource: DataSource) =>  (req: Request, res: Response) => {
    const recipes = dataSource.getRecipes(null, null);

    res.send(
        mustache.render(template, {
            html: renderToString(<App recipes={recipes}/>),
        })
    );
};