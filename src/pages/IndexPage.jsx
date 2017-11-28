import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {setQuery, setSearchType} from '../redux/actions';
import Search from '../components/Search';

export class IndexPage extends React.Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSearchTypeChange = this.onSearchTypeChange.bind(this);
	}

	onChange(e) {
		this.props.onQueryChange(e.target.value, this.props.query);
	}

	onSearchTypeChange(e) {
		this.props.onSearchTypeChange(e.target.value);
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.history.push('/search/' + this.props.query);
	}

	render() {
		let searchProps = {
			query: this.props.query,
			selectedSearchType: this.props.selectedSearchType,
			state: this.props
		};

		let searchHandlers = {
			onChange: this.onChange,
			onSearchTypeChange: this.onSearchTypeChange,
			onSubmit: this.onSubmit
		};

		return (
			<div>
				<Search {...searchProps} {...searchHandlers}/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	query: state.query,
	oldValue: state.oldValue,
	selectedSearchType: state.selectedSearchType
});

const mapDispatchToProps = dispatch => ({
	onQueryChange: (query, oldQuery) => dispatch(setQuery(query, oldQuery)),
	onSearchTypeChange: selectedSearchType => dispatch(setSearchType(selectedSearchType)),
});

const IndexPageConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(IndexPage));
export default IndexPageConnected;
