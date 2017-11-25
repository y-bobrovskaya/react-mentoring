import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './results';

export default function (initialState) {
  let store;
  
  store = createStore(reducer, initialState, applyMiddleware(thunk));
  return store;
}
