// what happened?

export const SWITCH_GENRE = 'SWITCH_GENRE'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const SWITCH_MOVIE = 'SWITCH_MOVIE'
// other export const ACTION_NEW = 'ACTION_NEW'

export const VisibilityFilters = {
    SHOW_COMEDIES: 'SHOW_COMEDIES',
    SHOW_FANTASTIC: 'SHOW_FANTASTIC',
    SHOW_MAINSTREAM: 'SHOW_MAINSTREAM',
    SHOW_ACTION: 'SHOW_ACTION',
    SHOW_CRIMINAL: 'SHOW_CRIMINAL',
    SHOW_DRAMA: 'SHOW_DRAMA'
  }

export function switchGenre(newGenre){
    return {
        type: SWITCH_GENRE,
        payload: {
            movies: newGenre
        }
    }
}

export function switchMovie(newMovie){
    return {
        type: SWITCH_MOVIE,
        payload: {
            movie: newMovie
        }
    }
}

export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter }
  }

const boundSwitchGenre = newGenre => dispatch(switchGenre(newGenre))
const boundSwitchMovie = newMovie => dispatch(switchMovie(newMovie))

// now it can be called like this: switchGenre(newGenre)