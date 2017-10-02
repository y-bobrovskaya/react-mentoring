import React from 'react';

export class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onSubmit(e) {
		alert(`${this.state.value} will be found soon.`);
		e.preventDefault();
	}

	onChange(e) {
		this.setState({value: e.target.value});
	}

	render() {
		return (
			<form onSubmit={this.onSubmit} className="search-form">
				<label htmlFor="search-field">Find your movie</label>
				<input type="text" name="search-field" id="search-field" value={this.state.value} onChange={this.onChange}/>
				<span>Search by</span>
				<input type="radio" name="serching" id="title"/><label htmlFor="title">Title</label>
				<input type="radio" name="serching" id="director"/><label htmlFor="director">Director</label>
				<input type="submit" value="Submit"/>
			</form>
		);
	}
}