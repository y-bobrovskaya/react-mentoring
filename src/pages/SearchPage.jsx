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
			oldValue: null,
			movies: [],
			selectedSearchType: 'title'
		};

		if (this.state.value) {
			this.doSearch(this.state.value);
		}
	}

	onChange(e) {
		this.setState({value: e.target.value, oldValue: this.state.value});
	}

	onSearchTypeChange(e) {
		this.setState({selectedSearchType: e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.history.push('/search/' + this.state.value);
	}

	doSearch(query) {
		// qs.stringify ?
		console.log("do search query // ** --- ", query, this.state.oldValue);
		let selectedSearchType = this.state.selectedSearchType.trim();
		let queryUrl = selectedSearchType == 'title'
			? 'https://api.themoviedb.org/3/search/movie?api_key=172283afd6dcc9211e5e1ee68cca7767&language=en-US&query=' + query
			: 'https://api.themoviedb.org/3/search/person?api_key=172283afd6dcc9211e5e1ee68cca7767&language=en-US&query=' + query;

		axios
			.get(queryUrl)
			.then(res => {
				console.log("res *** ----- ", res, res.data.results);
				// todo: update Content mapping for director search
				// todo: apply redux
				this.setState({movies: res.data.results});
			})
			.catch(err => {
				console.log("err *** ----- ", err);
			});
	}

	//componentWillUpdate(nextProps, nextState) {
	//	console.log("componentWillUpdate ---- ", nextProps, nextState, this.state.value, this.state.oldValue);
	//	//if (this.state.value && !this.state.movies) {
	//	if (this.state.value && (this.state.value !== this.state.oldValue)) {
	//		//this.setState({oldValue: this.state.value});
	//		//this.doSearch(this.state.value);
	//	}
	//}

	componentWillReceiveProps(nextProps) {
		console.log("componentWillReceiveProps ---- ", nextProps, this.state.value, this.state.oldValue);
		if (this.state.value !== this.state.oldValue) {
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
