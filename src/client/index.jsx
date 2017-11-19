import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import createStore from '../redux/store';

import { MyApp } from './app';
import SearchPage from '../pages/SearchPage';
import MoviePage from '../pages/MoviePage';
import IndexPage from '../pages/IndexPage';

const storeInstance = createStore();

const render = (store) => {
	ReactDom.render(
		<BrowserRouter>
			<AppContainer>
				<MyApp store={store}>
					<Switch>
						<Route exact path="/" component={IndexPage} />
						<Route path="/search/:query" component={SearchPage} />
						<Route path="/movie/:title" component={MoviePage} />
					</Switch>
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
