import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import createStore from ../redux/store;

import { MyApp } from './app';
import SearchPage from '../pages/SearchPage';
import MoviePage from '../pages/MoviePage';
import IndexPage from '../pages/IndexPage';

const render = ({store}) => {
	ReactDom.render(
		<Router>
			<AppContainer>
				<MyApp>
					<Provider store={store}>
						<Switch>
							<Route exact path="/" component={IndexPage} />
							<Route path="/search/:query" component={SearchPage} />
							<Route path="/movie/:title" component={MoviePage} />
						</Switch>
					</Provider>
				</MyApp>
			</AppContainer>
		</Router>,
		document.getElementById('app')
	)
};

render(createStore());

if (module.hot) {
	module.hot.accept('./app', render);
}
