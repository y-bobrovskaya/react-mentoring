import React from 'react';
import {withRouter} from 'react-router';
import Search from '../components/Search';
import {Content} from '../components/Content';

class IndexPage extends React.Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSearchTypeChange = this.onSearchTypeChange.bind(this);

		this.state = {
			value: this.props.match.params.query,
			movies: [],
			selectedSearchType: 'title'
		};
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

	render() {
		return (
			<div>
				<Search state={this.state} onChange={this.onChange} onSearchTypeChange={this.onSearchTypeChange} onSubmit={this.onSubmit}></Search>
				<Content movies={this.state.movies}></Content>
			</div>
		)
	}
}

export default withRouter(IndexPage);
