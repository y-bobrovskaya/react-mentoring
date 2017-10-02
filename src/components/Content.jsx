import React from 'react';

export const Content = function(props) {
	const moviesList = (
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
	);

	return (<div>{moviesList}</div>);
};