/*import {
  RESULTS_FETCH_SUCCESS,
  RESULTS_FETCH,
  RESULTS_FETCH_FAILURE,
  FILM_FETCH_SUCCESS,
  RESULTS_SORT_CHANGE,
} from './actionTypes';*/

export function doSearch(query) {
	//(dispatch) => {
		// qs.stringify ?
		console.log("do search query // ** --- ", query, this.state.oldValue);
		let selectedSearchType = this.state.selectedSearchType.trim();
		let queryUrl = selectedSearchType == 'title'
			? 'https://api.themoviedb.org/3/search/movie?api_key=172283afd6dcc9211e5e1ee68cca7767&language=en-US&query=' + query
			: 'https://api.themoviedb.org/3/search/person?api_key=172283afd6dcc9211e5e1ee68cca7767&language=en-US&query=' + query;

		axios
			.get(queryUrl)
			.then(res => {
				console.log("res *** ----- ", res, res.data.results);
				// todo: check Movie page
				//this.setState({movies: res.data.results});
				/*dispatch(res.data.results => {
				  type: 'RESULTS_FETCH_SUCCESS',
				  payload: res.data.results,
				});*/
				
				dispatch(fetchResultsSuccess(res.data.results));
			})
			.catch(err => {
				console.log("err *** ----- ", err);
				// todo: dispatch(fetchResultsError(err.message || 'Can\'t load results'));
			});
	//}
}
	
export function fetchResultsSuccess(results) {
	return {
		type: 'RESULTS_FETCH_SUCCESS',
		payload: results
	}
}