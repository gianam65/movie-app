import { SET_UPCOMMING } from "./upcommingTypes";

export const setUpcomming = (upcomming) => {
    return {
        type: SET_UPCOMMING,
        payload: upcomming,
    }
}