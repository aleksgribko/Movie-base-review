import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//import { createStore } from 'redux'
//import moviesList from './reducers/reducer1.js' 

/* const store = createStore(
	moviesList, 
	window.STATE_FROM_SERVER,
	// upload to the extension
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)*/


ReactDOM.render(<App />, document.getElementById('root'));

