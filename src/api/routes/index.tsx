import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import fs from 'fs';
import React from 'react';
import mustache from 'mustache';
import App from '../../react/App';
//import template from '../template.html';
import DataSource from '../../types/DataSource';

export default (dataSource: DataSource) => async (req: Request, res: Response) => {
    const recipes = await dataSource.getRecipes(null, null);
    const template = await getFile();

    res.send(
        mustache.render(template, {
            html: renderToString(<App recipes={recipes} />),
        })
    );
};

const getFile = () : Promise<string> => {
    return new Promise(res => {
        fs.readFile('../template.html', 'utf8', (err, data) => {
            console.log('data', data)
            res(data);
        });
    });
};