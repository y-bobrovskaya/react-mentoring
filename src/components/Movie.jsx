import React from 'react';

import { findMovieDirector, findMovieCast, getMovieGenres } from '../client/api/helpers';

export const Movie = (props) => (
	<div className="info-wrapper">
		<button onClick={props.goSearch}>Search</button>
		<div className="row">
			<img src={'https://image.tmdb.org/t/p/w300' + props.movie.poster_path} alt={props.movie.title}/>
			<div>
				<h1>{props.movie.title}</h1>
				<div>{props.movie.vote_average}</div>
				<div>{getMovieGenres(props.movie)}</div>
				<div><span>{props.movie.release_date}</span> | <span>{props.movie.duration | 'Inf'} min</span></div>
				<p>{props.movie.overview}</p>
				<div>Director: {findMovieDirector(props.movie).name}</div>
				<div>Cast: {findMovieCast(props.movie).name}</div>
			</div>
		</div>
	</div>
);
