import {
    MOVIES_FETCH_SUCCESS,
    MOVIES_FETCH_FAILURE,
    MOVIES_SORT_CHANGE,
    MOVIE_FETCH_SUCCESS,
    MOVIE_FETCH_FAILURE,
    DIRECTOR_INFO_FETCH_SUCCESS,
    DIRECTOR_INFO_FETCH_FAILURE,
    QUERY_SET,
    QUERY_SET_TYPE
} from './types';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    movie: {
        credits: {
            crew: []
        },
        genres: []
    },
    id: 1,
    director: {
        movie_credits: {
            crew: []
        }
    },
    movies: [],
    selectedSearchType: 'title',
    query: '',
    oldValue: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE_FETCH_SUCCESS:
            return {
                ...state,
                id: action.payload.id,
                movie: action.payload.result
            };
        case MOVIE_FETCH_FAILURE: {
            console.warn(action.payload);
            return {...state};
        }
        case MOVIES_FETCH_SUCCESS:
            return {
                ...state,
                query: action.payload.query,
                movies: action.payload.results,
            };
        case MOVIES_FETCH_FAILURE: {
            console.warn(action.payload);
            return {...state};
        }
        case DIRECTOR_INFO_FETCH_SUCCESS:
            return {
                ...state,
                director: action.payload.result
            };
        case DIRECTOR_INFO_FETCH_FAILURE: {
            console.warn(action.payload);
            return {...state};
        }
        case MOVIES_SORT_CHANGE:
            return {
                ...state,
                sortType: action.payload,
                movies: state.results,
            };
        case QUERY_SET:
            return {
                ...state,
                query: action.payload.query,
                oldValue: action.payload.oldQuery
            };
        case QUERY_SET_TYPE:
            return {
                ...state,
                selectedSearchType: action.payload
            };
        default:
            return state;
    }
};

function createStoreInstance(initialState) {
    let store;

    store = createStore(reducer, initialState, applyMiddleware(thunk));
    return store;
}

export {
    initialState,
    createStoreInstance
}
