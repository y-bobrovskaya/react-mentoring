import React from 'react';

export default class Search extends React.Component {
	render() {
		return (
			<div>
				<form onSubmit={this.props.onSubmit} className="search-form">
					<label htmlFor="search-field">Find your movie</label>
					<input type="text" name="search-field" id="search-field" value={this.props.state.value} onChange={this.props.onChange}/>
					<span>Search by</span>
					<input type="radio"
						name="searchType"
						id="title"
						value="title"
						checked={this.props.state.selectedSearchType === 'title'}
						onChange={this.props.onSearchTypeChange}/>
					<label htmlFor="title">Title</label>
					<input type="radio"
						name="searchType"
						id="director"
						value="director"
						checked={this.props.state.selectedSearchType === 'director'}
						onChange={this.props.onSearchTypeChange}/>
					<label htmlFor="director">Director</label>
					<input type="submit" value="Submit"/>
				</form>
			</div>
		);
	}
}
