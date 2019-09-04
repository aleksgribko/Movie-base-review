import React from 'react';
import ReactDOM from 'react-dom';

import store from './store'

import { Provider } from 'react-redux'
import './index.css';
import App from './App';

/*
Allows access to state via                     getState();
Allows state to be updated via                 dispatch(action);
Registers listeners via                        subscribe(listener);
Handles unregistering of listeners 
via the function returned by                   subscribe(listener).
*/

import { fetchMovies } from './actions/action.js'
//import { filmsGridData } from "./filmsGridData.js";

/*for (let oneGenre of filmsGridData) {
	for (let oneMovie of oneGenre.moviesId) {
		store.dispatch(fetchMovies(oneMovie)).then(() => console.log(store.getState()))
	}
}
*/

ReactDOM.render(
<Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

