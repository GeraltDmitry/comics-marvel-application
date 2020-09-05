import _ from 'lodash';
import * as types from './actionTypes.js';
import axios from 'axios';

export const fetchHeroes = (offset, searchText = '') => async(dispatch, getState) => {
    dispatch({ type: types.FETCH_HEROES });
    
        try {
            const response = await axios.get(`http://gateway.marvel.com/v1/public/characters?offset=${offset}${searchText ? `&nameStartsWith=${searchText}` : ''}&limit=20&ts=5&apikey=97d6b53aeaa37c80cbfc9807574b0be1&hash=78204913f9e6ca37081c1ffe953309f2`);
            const heroesById = _.keyBy(response.data.data.results, (item) => item.id);

            dispatch({ type: types.FETCH_HEROES_SUCCESS, payload: { heroesById, heroesArray: { [offset]: response.data.data.results }, searchText, limit: response.data.data.total } });
        }   
        catch (error) {
            console.error(error);

            dispatch({ type: types.FETCH_HEROES_ERROR });
        }
};

export const fetchComics = (offset, searchText = '') => async(dispatch, getState) => {
    dispatch({ type: types.FETCH_COMICS });

        try {
            const response = await axios.get(`http://gateway.marvel.com/v1/public/comics?offset=${offset}${searchText ? `&titleStartsWith=${searchText}` : ''}&limit=20&ts=5&apikey=97d6b53aeaa37c80cbfc9807574b0be1&hash=78204913f9e6ca37081c1ffe953309f2`);
            console.log('str 1 done');
            const comicsById = _.keyBy(response.data.data.results, (item) => item.id);
            console.log('str 2 done');
            dispatch({ type: types.FETCH_COMICS_SUCCESS, payload: { comicsById, comicsArray: { [offset]: response.data.data.results }, searchText, limit: response.data.data.total } });
            console.log('str 3 done');
        } catch (error) {
            console.error(error);

            dispatch({ type: types.FETCH_COMICS_ERROR });
        }
};