import { createStore } from 'redux';
import reducer from 'reducers';

export default function (initialState = {}) {
  let store;
  
  store = createStore(reducer, initialState);
  return store;
}
