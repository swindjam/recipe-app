import React from 'react';
import ReactDOM from 'react-dom';
import App from '../react/App';
import {Recipe} from '../types/Recipe';

declare global {
    interface Window { recipes: Recipe[] }
}

ReactDOM.hydrate(<App recipes={window.recipes || []}/>, document.getElementById('main'));