import React from 'react'; 
import { Route, Switch } from 'react-router-dom';

import SearchPage from './pages/SearchPage';
import MoviePage from './pages/MoviePage';
import IndexPage from './pages/IndexPage';

export default (<Switch>
						<Route exact path="/" component={IndexPage} />
						<Route path="/search/:query" component={SearchPage} />
						<Route path="/search/" component={SearchPage} />
						<Route path="/movie/:title" component={MoviePage} />
					</Switch>);
