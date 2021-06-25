import { SET_MOVIES, SELECTED_MOVIE, ADD_MOVIE, REMOVE_MOVIE } from "./movieTypes"

const initialState = {
    movies: [],
    movieCart: [],
}

export const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MOVIES:
            return {
                ...state,
                movies: action.payload,
            }
        case SELECTED_MOVIE: 
            return {
                ...state,
                idSelected: action.payload.idSelected,
                titleSelected: action.payload.titleSelected
            }
        case ADD_MOVIE:
            const item = state.movies.results.find(movie => movie.id === action.payload)
            const inCart = state.movieCart.find((item) => item.id === action.payload ? true : false)
            return {
                ...state,
                movieCart: inCart ? state.movieCart.map((item) => {
                    return item.id === action.payload ? {...item, already: true} : item
                }) : [...state.movieCart, {...item, already: false}]
            }
        case REMOVE_MOVIE:
            return {
                ...state,
                movieCart: state.movieCart.filter((item) => item.id !== action.payload)
            }
        default:
            return state;
    }
}

