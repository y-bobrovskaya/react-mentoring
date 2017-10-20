import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router';
import Search from '../components/Search';
import {Content} from '../components/Content';
import {SortBy} from '../components/SortBy';
import _ from 'lodash';
import Movies from '../client/Movies';

class SearchPage extends React.Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSearchTypeChange = this.onSearchTypeChange.bind(this);

		this.state = {
			value: this.props.match.params.query,
			movies: [],
			selectedSearchType: 'movie'
		};

		if (this.state.value) {
			this.doSearch(this.state.value);
		}
	}

	onChange(e) {
		this.setState({value: e.target.value});
	}

	onSearchTypeChange(e) {
		this.setState({selectedSearchType: e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.history.push('/search/' + this.state.value);
	}

	doSearch(query) {
		let selectedSearchType = this.state.selectedSearchType.trim();
		let queryUrl = selectedSearchType == 'movie'
			? 'https://api.themoviedb.org/3/movie/popular?api_key=172283afd6dcc9211e5e1ee68cca7767&language=en-US&page=1'
			: 'https://api.themoviedb.org/3/tv/popular?api_key=172283afd6dcc9211e5e1ee68cca7767&language=en-US&page=1';

		axios
			.get(queryUrl)
			.then(res => {
				console.log("res *** ----- ", res);
				this.state.movies = _.filter(res.data.results, function(movie) {
					// todo: map movies title-name
					// todo: map Movie page
					return _.includes(movie.title.trim().toLowerCase(), query.trim().toLowerCase());
				});
			})
			.catch(err => {
				console.log("err *** ----- ", err);
			});
	}

	componentWillUpdate() {
		if (this.state.value) {
			this.doSearch(this.state.value);
		}
	}

	render() {
		let searchProps = {
			value: this.state.value,
			selectedSearchType: this.state.selectedSearchType
		};

		return (
			<div>
				<Search {...searchProps} state={this.state} onChange={this.onChange} onSearchTypeChange={this.onSearchTypeChange} onSubmit={this.onSubmit} />
				{this.state.movies.length
					?
					<div className="row">
					<span className="counter">{this.state.movies.length} movies found</span>
					<SortBy />
					</div>
					: ''
				}
				<Content movies={this.state.movies} />
			</div>
		)
	}
}

export default withRouter(SearchPage);
