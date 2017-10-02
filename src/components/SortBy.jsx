import React from 'react';

export const SortBy = () => (
	<div>
		<span>Sort by</span>
		<input type="radio" name="sorting" id="release"/><label htmlFor="title">release date</label>
		<input type="radio" name="sorting" id="rating"/><label htmlFor="director">rating</label>
	</div>
);