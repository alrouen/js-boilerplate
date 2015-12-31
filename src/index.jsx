import './css/main.scss';
import React from 'react';

import ReactDOM from 'react-dom'; import App from './components/App.jsx';

import todoStore from './stores/TodoStore';

todoStore();

ReactDOM.render(<App />, document.getElementById('app'));
