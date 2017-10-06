import React from 'react';
import { SortBy } from './SortBy';

export const Content = function(props) {
	const moviesList = (
		props.movies.length
			? <div>
					<div className="row">
						<span className="counter">{props.movies.length} movies found</span>
						<SortBy />
					</div>
					<ul>
						{props.movies.map((movie) =>
							<li key={movie.id}>
								<img src={movie.picture.source} alt={movie.picture.alt}/>
								<span>{movie.title}</span>
								<span>{movie.year}</span>
								<span>{movie.category}</span>
							</li>
						)}
					</ul>
				</div>
			: <div>No films found</div>
	);

	return (<div>{moviesList}</div>);
};