import React from 'react';
import axios from 'axios';
//import {withRouter} from 'react-router';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  doSearch 
} from '../redux/searchActions';
import Search from '../components/Search';
import {Content} from '../components/Content';
import {SortBy} from '../components/SortBy';
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
			this.props.onSearch(this.state.value);
			//this.doSearch(this.state.value);
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

	componentWillReceiveProps(nextProps) {
		if (this.state.value !== this.state.oldValue) {
			//this.doSearch(this.state.value);
			this.props.onSearch(this.state.value);
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

const mapStateToProps = state => ({
  //...state.search,
  value: state.value,
  movies: state.results,
  selectedSearchType: state.selectedSearchType
  
  /*sortType: state.results.sortType,
  sortFields: state.results.sortFields,
  isPending: state.results.isPending,*/
});

const mapDispatchToProps = dispatch => ({
  onSearch: query => dispatch(doSearch(query)),
  //onSearchTypeChange: type => dispatch(setQueryType(type)),
  //onSortChange: type => dispatch(changeSort(type)),
});

const SearchPageConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
//const SearchPageConnected = connect(mapStateToProps, mapDispatchToProps)(SearchPage);

export default SearchPageConnected;

//export default withRouter(SearchPage);
