import React from 'react';

export const Movie = (props) => (
	<div className="info-wrapper">
		<button onClick={props.goSearch}>Search</button>
		<div className="row">
			<img src={props.movie.picture.source} alt={props.movie.picture.alt}/>
			<div>
				<h1>{props.movie.title}</h1>
				<div>{props.movie.rating}</div>
				<span>{props.movie.category}</span>
				<span>{props.movie.year}</span>
				<span>{props.movie.duration} min</span>
				<p>{props.movie.description}</p>
				<span>Director: {props.movie.director}</span>
				<span>Cast: {props.movie.cast}</span>
			</div>
		</div>
	</div>
);