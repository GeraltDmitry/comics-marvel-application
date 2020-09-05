import { FETCH_COMICS_SUCCESS } from '../actions/actionTypes';

const initialState = {
    isLoaded: false,
    comicsById: {},
    comicsArrayBySearchText: {},
    comicsArrayByOffset: {}
};

export const comics = (state = initialState, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_COMICS_SUCCESS:
            return {
                comicsById: { ...state.comicsById, ...payload.comicsById },
                comicsArrayBySearchText: { ...state.comicsArrayBySearchText, [payload.searchText]: { ...state.comicsArrayBySearchText[payload.searchText], ...payload.comicsArray, limit: payload.limit }},
                comicsArrayByOffset: payload.searchText ? state.comicsArrayByOffset : { ...state.comicsArrayByOffset, ...payload.comicsArray },
                limit: payload.limit
            }
        default:
            return state;
    }
}