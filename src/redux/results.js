import {
  RESULTS_FETCH_SUCCESS,
  RESULTS_FETCH,
  RESULTS_FETCH_FAILURE,
  FILM_FETCH_SUCCESS,
  RESULTS_SORT_CHANGE,
} from './actionTypes';

const initialState = {
  results: [],
  sortType: 'releaseYear',
  sortFields: [{ id: 'releaseYear', caption: 'release date' }, { id: 'rating', caption: 'rating' }],
  isPending: false,
  value: ''
};

const sortByField = (results, field) => (
  [...results].sort((a, b) => b[field] - a[field])
);

const results = (state = initialState, action) => {
  switch (action.type) {
    case RESULTS_FETCH_SUCCESS:
    case FILM_FETCH_SUCCESS:
      return {
        ...state,
        isPending: false,
        results: sortByField(action.payload, state.sortType),
      };
    case RESULTS_SORT_CHANGE:
      return {
        ...state,
        sortType: action.payload,
        results: sortByField(state.results, action.payload),
      };
    case RESULTS_FETCH:
      return { ...state, isPending: true };
    case RESULTS_FETCH_FAILURE:
      return { ...state, isPending: false };
    default:
      return state;
  }
};

export default results;
