import {renderToString} from 'react-dom/server';
import {Request, Response} from 'express';
import React from 'react';
import mustache from 'mustache';
import App from '../../react/App';
import template from '../template.html';import getRecipes from '../getRecipes';
;

export default (req: Request, res: Response) => {
    const recipes = getRecipes();

    res.send(
        mustache.render(template, {
            html: renderToString(<App recipes={recipes}/>),
        })
    );
};