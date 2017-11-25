import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import createStore from '../redux/store';

import { MyApp } from './app';
import routes from '../routes';

const storeInstance = createStore(window.PRELOADED_STATE || {});
delete window.PRELOADED_STATE;

const render = (store) => {
	ReactDom.render(
		<BrowserRouter>
			<AppContainer>
				<MyApp store={store}>
					{routes}
				</MyApp>
			</AppContainer>
		</BrowserRouter>,
		document.getElementById('app')
	)
};

render(storeInstance); // window.__PRELOADED_STATE__ || {} ?

if (module.hot) {
	module.hot.accept('./app', () => {
		const NextApp = require('./app');
		render(storeInstance);
	  });
}
