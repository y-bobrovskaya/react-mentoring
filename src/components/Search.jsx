import React from 'react';

export default class Search extends React.Component {
	render() {
		// todo: change on title/director
		return (
			<div>
				<form onSubmit={this.props.onSubmit} className="search-form">
					<label htmlFor="search-field">Find your movie</label>
					<input type="text" name="search-field" id="search-field" value={this.props.query} onChange={this.props.onChange}/>
					<span>Search by</span>
					<input type="radio"
						name="searchType"
						id="movie"
						value="movie"
						checked={this.props.selectedSearchType === 'movie'}
						onChange={this.props.onSearchTypeChange}/>
					<label htmlFor="movie">Movie</label>
					<input type="radio"
						name="searchType"
						id="tvshow"
						value="tvshow"
						checked={this.props.selectedSearchType === 'tvshow'}
						onChange={this.props.onSearchTypeChange}/>
					<label htmlFor="tvshow">TV show</label>
					<input type="submit" value="Submit"/>
				</form>
			</div>
		);
	}
}
