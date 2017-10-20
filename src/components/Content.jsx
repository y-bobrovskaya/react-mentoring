import React from 'react';

export const Content = function(props) {
	const moviesList = (
		props.movies.length
			?	<ul>
					{props.movies.map((movie) =>
						<li key={movie.id}>
							<a href={'/movie/' + movie.title}>
								<img src={'https://image.tmdb.org/t/p/w300' + movie.poster_path} alt={movie.title}/>
								<div>
									<span>{movie.title}</span>
									<span>{movie.year}</span>
								</div>
								<div>{movie.category}</div>
							</a>
						</li>
					)}
				</ul>
			: <div>No films found</div>
	);

	return (<div>{moviesList}</div>);
};