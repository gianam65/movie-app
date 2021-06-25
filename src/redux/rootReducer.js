import {combineReducers} from 'redux'
import { moviesReducer } from './movies/movieReducer'
import { upcommingReducer } from './upcomming/upcommingReducer'

const rootReducers = combineReducers({
    movies: moviesReducer,
    upcomming: upcommingReducer,
})

export default rootReducers