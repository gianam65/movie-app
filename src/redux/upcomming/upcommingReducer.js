import { SET_UPCOMMING } from "./upcommingTypes";

const initialState = {
    upcomming: []
}

export const upcommingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_UPCOMMING:
            return {
                ...state,
                upcomming: action.payload
            }
        default:
            return state
    }
}