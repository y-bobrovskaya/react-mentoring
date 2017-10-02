import React from 'react';

export const Movie = ({picture, title, rating, category, duration, year, description, director, cast}) => (
	<div className="info-wrapper">
		<button>Back to search</button>
		<img src={picture.source} alt={picture.alt}/>
		<h1>{title}</h1>
		<div>{rating}</div>
		<span>{category}</span>
		<span>{year}</span>
		<span>{duration} min</span>
		<p>{description}</p>
		<span>Director: {director}</span>
		<span>Cast: {cast}</span>
	</div>
);