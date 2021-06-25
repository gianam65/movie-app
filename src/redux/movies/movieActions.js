import { SET_MOVIES, SELECTED_MOVIE, ADD_MOVIE, REMOVE_MOVIE } from "./movieTypes";


export const setMovies = (movies) => {
    return {
        type: SET_MOVIES,
        payload: movies
    }
}

export const selectedMovie = (idSelected, titleSelected) => {
    return {
        type: SELECTED_MOVIE,
        payload: {
            idSelected,
            titleSelected
        }
    }
}

export const addMovie = (id) => {
    return {
        type: ADD_MOVIE,
        payload: id
    }
}

export const removeMovie = (id) => {
    return {
        type: REMOVE_MOVIE,
        payload: id
    }
}