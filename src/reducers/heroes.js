import { FETCH_HEROES_SUCCESS } from '../actions/actionTypes';

const initialState = {
    isLoaded: false,
    heroesById: {},
    heroesArrayBySearchText: {},
    heroesArrayByOffset: {}
};

export const heroes = (state = initialState, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_HEROES_SUCCESS:
            return {
                heroesById: { ...state.heroesById, ...payload.heroesById },
                heroesArrayBySearchText: { ...state.heroesArrayBySearchText, [payload.searchText]: { ...state.heroesArrayBySearchText[payload.searchText], ...payload.heroesArray, limit: payload.limit }},
                heroesArrayByOffset: payload.searchText ? state.heroesArrayByOffset : { ...state.heroesArrayByOffset, ...payload.heroesArray },
                limit: payload.limit
            }
        default:
            return state;
    }
}