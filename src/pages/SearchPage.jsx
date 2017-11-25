import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {doSearch, setQuery, setSearchType} from '../redux/searchActions';
import Search from '../components/Search';
import {Content} from '../components/Content';
import {SortBy} from '../components/SortBy';

class SearchPage extends React.Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSearchTypeChange = this.onSearchTypeChange.bind(this);

		if (this.props.match.params.query) {
			this.props.onSearch(this.props.match.params.query, this.props.selectedSearchType);
		}
	}

	onChange(e) {
		//todo: sorting?
		this.props.onQueryChange(e.target.value, this.props.value);
	}

	onSearchTypeChange(e) {
		this.props.onSearchTypeChange(e.target.value);
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.history.push('/search/' + this.props.value);
		this.props.onSearch(this.props.value, this.props.selectedSearchType);
	}

	render() {
		let searchProps = {
			value: this.props.value,
			selectedSearchType: this.props.selectedSearchType
		};

		return (
			<div>
				<Search {...searchProps} state={this.props} onChange={this.onChange} onSearchTypeChange={this.onSearchTypeChange} onSubmit={this.onSubmit} />
				{this.props.movies.length
					?
					<div className="row">
					<span className="counter">{this.props.movies.length} movies found</span>
					<SortBy />
					</div>
					: ''
				}
				<Content movies={this.props.movies} />
			</div>
		)
	}
}

const mapStateToProps = state => ({
  value: state.value,
  oldValue: state.oldValue,
  movies: state.results,
  selectedSearchType: state.selectedSearchType
  
  /*sortType: state.results.sortType,
  sortFields: state.results.sortFields,
  isPending: state.results.isPending,*/
});

const mapDispatchToProps = dispatch => ({
  onSearch: (query, selectedSearchType) => dispatch(doSearch(query, selectedSearchType, dispatch)),
  onQueryChange: (query, oldQuery) => dispatch(setQuery(query, oldQuery)),
	onSearchTypeChange: selectedSearchType => dispatch(setSearchType(selectedSearchType)),
  //onSortChange: type => dispatch(changeSort(type)),
});

const SearchPageConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
export default SearchPageConnected;