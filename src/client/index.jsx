import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { MyApp } from './app';
import SearchPage from '../pages/SearchPage';
import MoviePage from '../pages/MoviePage';
import IndexPage from '../pages/IndexPage';

const render = () => {
	ReactDom.render(
		<Router>
			<AppContainer>
				<MyApp>
					<Switch>
						<Route exact path="/" component={IndexPage} />
						<Route path="/search/:query" component={SearchPage} />
						<Route path="/movie/:title" component={MoviePage} />
					</Switch>
				</MyApp>
			</AppContainer>
		</Router>,
		document.getElementById('app')
	)
};

render();

if (module.hot) {
	module.hot.accept('./app', render);
}
