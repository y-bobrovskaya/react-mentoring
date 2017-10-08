import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { MyApp } from './app';
//import { Content } from '../components/Content';
//import { Movie } from '../components/Movie';
import Search from '../components/Search';

const render = () => {
	ReactDom.render(
		<Router>
			<AppContainer>
				<MyApp>
					<Switch>
						<Route exact path="/" component={Search} />
						<Route path="/search/:query" component={Search} /> {/* doesn't work*/}
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
