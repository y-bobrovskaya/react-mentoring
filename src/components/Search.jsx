import React from 'react';
import { Content } from './Content';
import { withRouter } from 'react-router';

class Search extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			value: '',
			movies: []
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		
		console.log("this.props ----- ", this.props);
		//TODO: doSearch if param , set movies
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.history.push('search/' + this.state.value);
	}

	onChange(e) {
		this.setState({value: e.target.value});
	}

	render() {
		return (
		<div>
			<form onSubmit={this.onSubmit} className="search-form">
				<label htmlFor="search-field">Find your movie</label>
				<input type="text" name="search-field" id="search-field" value={this.state.value} onChange={this.onChange}/>
				<span>Search by</span>
				<input type="radio" name="serching" id="title"/><label htmlFor="title">Title</label>
				<input type="radio" name="serching" id="director"/><label htmlFor="director">Director</label>
				<input type="submit" value="Submit"/>
			</form>
			<Content movies={this.state.movies}></Content>
		</div>
		);
	}
}

export default withRouter(Search);