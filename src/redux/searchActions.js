import {
	RESULTS_FETCH_SUCCESS,
	RESULTS_FETCH,
	RESULTS_FETCH_FAILURE,
	FILM_FETCH_SUCCESS,
	RESULTS_SORT_CHANGE,
	QUERY_SET,
	QUERY_SET_TYPE
} from './actionTypes';
import axios from 'axios';

export function doSearch(query, selectedSearchType, dispatch) {
	// qs.stringify ?
	let queryUrl = selectedSearchType.trim() == 'title'
		? 'https://api.themoviedb.org/3/search/movie?api_key=172283afd6dcc9211e5e1ee68cca7767&language=en-US&query=' + query
		: 'https://api.themoviedb.org/3/search/person?api_key=172283afd6dcc9211e5e1ee68cca7767&language=en-US&query=' + query;

	return () => axios
		.get(queryUrl)
		.then(res => {
			dispatch(fetchResultsSuccess(res.data.results, query));
		})
		.catch(err => {
			console.log("err *** ----- ", err);
			// todo: dispatch(fetchResultsError(err.message || 'Can\'t load results'));
		});
}

export function doSearchMovie(query, dispatch) {
	let queryUrl = 'https://api.themoviedb.org/3/search/movie?api_key=172283afd6dcc9211e5e1ee68cca7767&language=en-US&query=' + query;

	return () => axios
		.get(queryUrl)
		.then(res => {
			// /movie/${results[0].id}/credits?..
			// like in getFilmByTitle()
			dispatch(fetchResultsSuccess(res.data.results, query));
		})
		.catch(err => {
			console.log("err *** ----- ", err);
			// todo: dispatch(fetchResultsError(err.message || 'Can\'t load results'));
		});
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

function fetchResultsSuccess(results, query) {
	return {
		type: RESULTS_FETCH_SUCCESS,
		payload: {results, query}
	}
}