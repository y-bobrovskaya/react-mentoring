import {
  RESULTS_FETCH_SUCCESS,
  RESULTS_FETCH,
  RESULTS_FETCH_FAILURE,
  FILM_FETCH_SUCCESS,
  RESULTS_SORT_CHANGE,
	QUERY_SET,
	QUERY_SET_TYPE // todo: rename
} from './actionTypes';

const initialState = {
	movie: {},
  results: [],
	selectedSearchType: 'title',
  sortType: 'releaseYear',
  sortFields: [{ id: 'releaseYear', caption: 'release date' }, { id: 'rating', caption: 'rating' }],
  //isPending: false,
  value: '',
	oldValue: ''
};

const sortByField = (results, field) => (
  [...results].sort((a, b) => b[field] - a[field])
);

const results = (state = initialState, action) => {
	console.log("results ---- action ", action, state);
  switch (action.type) {
    case RESULTS_FETCH_SUCCESS:
		case FILM_FETCH_SUCCESS:
      return {
        ...state,
				//oldValue: action.payload.query,
				value: action.payload.query,
				//isPending: false,
				movie: action.payload.movie,
        results: sortByField(action.payload.results, state.sortType),
      };
    case RESULTS_SORT_CHANGE:
      return {
        ...state,
        sortType: action.payload,
        results: sortByField(state.results, action.payload),
      };
    //case RESULTS_FETCH:
    //  return { ...state, isPending: true };
    //case RESULTS_FETCH_FAILURE:
    //  return { ...state, isPending: false };
		case QUERY_SET:
			return {
				...state,
				value: action.payload.query,
				oldValue: action.payload.oldQuery
			};
		case QUERY_SET_TYPE:
			return {
				...state,
				selectedSearchType: action.payload.selectedSearchType
			};
    default:
      return state;
  }
};

export default results;
