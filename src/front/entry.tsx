import React from 'react';
import ReactDOM from 'react-dom';
import App from '../react/App';

ReactDOM.hydrate(<App recipes={[]}/>, document.getElementById('main'));