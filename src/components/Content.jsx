import React from 'react';
import { Link } from 'react-router-dom'

function encodeIdAndTitle(movie) {
	return `${movie.id}-${movie.title.toLowerCase().replace(/[:.]/g, '').replace(/ /g, '-')}`;
}

export const Content = function(props) {
	const moviesList = (
		props.movies.length
			?	<ul>
					{props.movies.map((movie) =>
						<li key={movie.id}>
							<Link to={'/movie/' + encodeIdAndTitle(movie)}>
								<img src={'https://image.tmdb.org/t/p/w300' + movie.poster_path} alt={movie.title}/>
								<div>
									<span>{movie.title}</span>
									<span>{movie.year}</span>
								</div>
								<div>{movie.category}</div>
							</Link>
						</li>
					)}
				</ul>
			: <div>No films found</div>
	);

	return (<div>{moviesList}</div>);
};
