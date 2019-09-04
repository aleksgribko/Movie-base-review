let baseURL = 'https://api.themoviedb.org/3/movie/'
const keyAPI = process.env.REACT_APP_FILMS_API_KEY

export const SWITCH_GENRE = 'SWITCH_GENRE'
export const SWITCH_MOVIE = 'SWITCH_MOVIE'
export const RECEIVE_COMMENTS = 'RECEIVE_MOVIES'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const REQUEST_MOVIES = 'REQUEST_MOVIES'
export const RECEIVE_MOVIES = 'RECEIVE_MOVIES'
export const FINISH_RECEIVING = 'FINISH_RECEIVING'
export const TOGGLE_COMMENT_FORM = 'TOGGLE_COMMENT_FORM'
export const LOGIN = 'LOGIN'

function requestMovies() {
    return {
        type: REQUEST_MOVIES,        
    }
}

function receiveMovies(json, genre) {

    return {
        type: RECEIVE_MOVIES,
        movie: json,
        genre: genre,
    }
}

function finishReceiving() {
    return {
        type: FINISH_RECEIVING,        
    }
}

export const fetchMovies = moviesIds => dispatch => {
    dispatch(requestMovies())
    for (let oneMovie of moviesIds) {
        let url = `${baseURL}${oneMovie.id}?language=en-US&api_key=${keyAPI}`
        fetch(url)
            .then(
                result => result.json(),
                error => console.log('An error occured.', error)
            )
            .then(dataWithoutGenre => {return {...dataWithoutGenre, genre: oneMovie.genre}})
            .then(data => dispatch(receiveMovies(data)))
            .then(() => {if(oneMovie == moviesIds[moviesIds.length-1]){dispatch(finishReceiving())}})
            .catch((err) => {
                //	result.json({
                //		error: error
                //	})
                console.log(err)
            })
    }

}

export function switchGenre(newGenre) {
    return {
        type: SWITCH_GENRE,
        payload: {
            genre: newGenre
        }
    }
}

export function switchMovie(newMovie) {
    return {
        type: SWITCH_MOVIE,
        payload: {
            movie: newMovie
        }
    }
}

export function addComment(positive, forMovie, topic, description, person) {
    return {
        type: ADD_COMMENT,
        positive,
        forMovie,
        topic,
        description,
        person
    }
}

export function editComment(index, typeOfComment, titleComment, textComment) {
    return {
        type: EDIT_COMMENT,
        payload: {
            index,
            typeOfComment,
            titleComment,
            textComment
        }        
    }
}

export function deleteComment(index) {
    return {
        type: DELETE_COMMENT,
        payload: {
            index
        } 
    }
}

export function toggleCommentForm(id, topic, description, positive){
    return {
        type: TOGGLE_COMMENT_FORM,
        payload: {
            id, 
            topic, 
            description, 
            positive
        }
    }
}

export function logIn(name){
    return {
        type: LOGIN,
        payload: {
            name
        }
    }
}

/*
const boundSwitchGenre = newGenre => dispatch(switchGenre(newGenre))
const boundSwitchMovie = newMovie => dispatch(switchMovie(newMovie))
const boundAddComment = (positive, forMovie, topic, description, person) => dispatch(addComment(positive, forMovie, topic, description, person))
const boundEditComment = (index, typeOfComment, titleComment, textComment) => dispatch(editComment(index, typeOfComment, titleComment, textComment))

// now it can be called like this: boundSwitchGenre(newGenre)
*/