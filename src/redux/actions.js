import {
    MOVIES_FETCH,
    MOVIES_FETCH_FAILURE,
    MOVIES_FETCH_SUCCESS,
    MOVIE_FETCH_FAILURE,
    MOVIE_FETCH,
    MOVIE_FETCH_SUCCESS,
    QUERY_SET,
    QUERY_SET_TYPE,
    DIRECTOR_INFO_FETCH,
    DIRECTOR_INFO_FETCH_SUCCESS,
    DIRECTOR_INFO_FETCH_FAILURE
} from './types';

import axios from 'axios';

import * as moviedb from '../client/api/moviedb';
import { findMovieDirector, getAllDirectedMovies } from '../client/api/helpers';

export function doSearch(query, selectedSearchType, dispatch) {
    dispatch({type: MOVIES_FETCH});

    let isByTitle = selectedSearchType.trim() === 'title';

		if (isByTitle) {
			return () => axios
				.get(moviedb.getSearchMovieUrl(query))
				.then(res => {
					dispatch(moviesFetchSuccess(res.data.results, query));
				})
				.catch(err => {
					console.trace(err);
					dispatch(moviesFetchFailure(err.message || 'Can\'t load results'))
				});
		} else {
			return () => axios
				.get(moviedb.getSearchPersonUrl(query))
				.then(({data: {results: persons}}) => {
					axios
						.get(moviedb.getPersonDetailUrl(persons[0].id, ['movie_credits']))
						.then(({data: director}) => {
							dispatch(moviesFetchSuccess(getAllDirectedMovies(director), query));
						})
				})
				.catch(err => {
					console.trace(err);
					dispatch(moviesFetchFailure(err.message || 'Can\'t load results'))
				});
		}
}

function moviesFetchSuccess(results, query) {
    return {
        type: MOVIES_FETCH_SUCCESS,
        payload: {results, query}
    }
}

function moviesFetchFailure(message) {
    return {
        type: MOVIES_FETCH_FAILURE,
        payload: message
    }
}

export function getMovieDetail(id, dispatch) {
    dispatch({type: MOVIE_FETCH});

    return () => axios
        .get(moviedb.getMovieDetailUrl(id, ['credits']))
        .then(({data: movie}) => {
            let director = findMovieDirector(movie);

            dispatch(movieFetchSuccess(movie, id));

            if (director.id) {
                dispatch(getDirectorInfo(director.id, dispatch));
            }
        })
        .catch(err => {
            console.trace(err);
            dispatch(movieFetchFailure(err.message || 'Can\'t load results'))
        });
}

function movieFetchSuccess(result, id) {
    return {
        type: MOVIE_FETCH_SUCCESS,
        payload: {result, id}
    }
}

function movieFetchFailure(message) {
    return {
        type: MOVIE_FETCH_FAILURE,
        payload: message
    }
}

export function getDirectorInfo(id, dispatch) {
    dispatch({type: DIRECTOR_INFO_FETCH});

    return () => axios
        .get(moviedb.getPersonDetailUrl(id, ['movie_credits']))
        .then(({data: director}) => {
            dispatch(directorInfoFetchSuccess(director, id));
        })
        .catch(err => {
            console.trace(err);
            dispatch(directorInfoFetchFailure(err.message || 'Can\'t load results'))
        });
}

function directorInfoFetchSuccess(result, id) {
    return {
        type: DIRECTOR_INFO_FETCH_SUCCESS,
        payload: {result, id}
    }
}

function directorInfoFetchFailure(message) {
    return {
        type: DIRECTOR_INFO_FETCH_FAILURE,
        payload: message
    }
}

export function setQuery(query, oldQuery) {
    return {
        type: QUERY_SET,
        payload: {query, oldQuery}
    };
}

export function setSearchType(selectedSearchType) {
    return {
        type: QUERY_SET_TYPE,
        payload: selectedSearchType
    };
}
