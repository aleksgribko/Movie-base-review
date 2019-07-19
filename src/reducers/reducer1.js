// update the state according to the actions
// I want to store all movies and current genre

/* principle of reducer's work: (previousState, action) => newState.
Given the same arguments, it should calculate the next state and return it. 
No surprises. No side effects. No API calls. No mutations. Just a calculation.*/

/* Things you should never do inside a reducer:

Mutate its arguments;
Perform side effects like API calls and routing transitions;
Call non-pure functions, e.g. Date.now() or Math.random().
*/
import { SWITCH_GENRE, SWITCH_MOVIE, SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions/action-genre.js'
import { combineReducers } from 'redux'

const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
      case SET_VISIBILITY_FILTER:
        return action.filter
      default:
        return state
    }   
}

/*define an initial state
const initialState = {
    visibilityFilter: '',
    movies: [],
    movie: null
  }
*/

function formMoviesList(state = [], action){
    switch(action.type){
        case SWITCH_GENRE:
            return [
                ...state,
            ]
        default:
            return state
    }
}

function getOneMovie(state = [], action){
    switch(action.type){
        case SWITCH_MOVIE:
            return [
                ...state,
            ]
        default:
            return state
    }
}


// This new tree is now the next state of your app:
const moviesList = combineReducers({
    visibilityFilter,
    formMoviesList,
    getOneMovie
})

/* Every listener registered with store.subscribe(listener) will now be invoked; 
listeners may call store.getState() to get the current state.
*/

export default moviesList
  

// call store.dispatch(action) from everywhere in the app