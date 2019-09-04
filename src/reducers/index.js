
import {
    REQUEST_MOVIES,
    RECEIVE_MOVIES,
    FINISH_RECEIVING,
    SWITCH_GENRE,
    SWITCH_MOVIE,
    ADD_COMMENT,
    EDIT_COMMENT, 
    DELETE_COMMENT,
    TOGGLE_COMMENT_FORM,
    LOGIN
} from '../actions/action.js'
import { combineReducers } from 'redux'
import comments from '../components/comments.js'

function formMoviesArray(
    state = {
        isFetching: false,
        movies: []
    },
    action
) {
    switch (action.type) {
        case REQUEST_MOVIES:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_MOVIES:
            return Object.assign({}, state, {          
                movies: [...state.movies, action.movie]
            })
        case FINISH_RECEIVING:
            return Object.assign({}, state, {
                isFetching: false
            })
        default:
            return state
    }
}

// function that updates objects and state
function updateObject(oldObject, newValues) {
    return Object.assign({}, oldObject, newValues)
}

function updateItemInArray(array, itemId, updateItemCallback) {
    const updatedItems = array.map(item => {
        if (item.id !== itemId) {
            // Since we only want to update one item, preserve all others as they are now
            return item
        }
        // Use the provided callback to create an updated item
        const updatedItem = updateItemCallback(item)
        return updatedItem
    })

    return updatedItems
}

function deleteItemInArray(array, itemId) { 
    const updatedItems = array.filter(item =>  item.id !== itemId) 
    return updatedItems
}

function currentGenreMovie(state = {currentMovie: null, currentGenre: '' }, action) {
    switch (action.type) {
        case SWITCH_GENRE:
            return updateObject(state, { currentGenre: action.genre })
        case SWITCH_MOVIE:
            return updateObject(state, { currentMovie: action.movie })
        default:
            return state
    }
}

function allComments(state = [...comments], action) {
    let lastId = 0
    state.map(oneComment => {
        if(oneComment.id > lastId){lastId = oneComment.id}
    })
    switch (action.type) {
        case ADD_COMMENT:
            return ([
                    ...state,
                    {
                        id: lastId + 1,
                        positive: action.positive,
                        forMovie: action.forMovie,
                        topic: action.topic,
                        description: action.description,
                        person: action.person,
                    }
                ])            
        case EDIT_COMMENT:
            const commentsAfterUpdate = updateItemInArray(state, action.index, comment => {
                return updateObject(comment, {
                    positive: action.typeOfComment,
                    topic: action.titleComment,
                    description: action.textComment,
                })
            })
            return commentsAfterUpdate
        case DELETE_COMMENT:
            const commentsAfterDelete = deleteItemInArray(state, action.payload.id)
            return commentsAfterDelete  
        default:
            return state
    }
}
const toggleCommentForm = (state = {}, action) => {   
    switch(action.type){
        case TOGGLE_COMMENT_FORM:            
            return {                 
                id: action.payload.id, 
                topic: action.payload.topic, 
                description: action.payload.description, 
                positive: action.payload.positive,
            }
        default:
            return state
    }
}

const logIn = (state = {name: 'guest'}, action) => {
    switch(action.type){
        case LOGIN:
            return {name: action.payload.name}
        default:
            return state
    }
}

//main function
// This new tree is now the next state of your app:
const movieApp = combineReducers({    
    page: currentGenreMovie,
    allComments: allComments,
    movies: formMoviesArray,
    commentType: toggleCommentForm,
    user: logIn
})

/* Every listener registered with store.subscribe(listener) will now be invoked; 
listeners may call store.getState() to get the current state.
*/

export default movieApp

// call store.dispatch(action) from everywhere in the app