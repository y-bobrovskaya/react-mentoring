import React from 'react'
import { Logo } from '../components/Logo';
import { Search } from '../components/Search';
import { Movie } from '../components/Movie';
import { Content } from '../components/Content';
import Movies from './Movies';

export class MyApp extends React.Component {
	render() {
		return (
			<div>
				<header>
					<Logo />
				</header>
				<main>
					<Search />
					{/*<Movie {...Movies[0]}/>*/}
					{/*<Content movies={Movies}/>*/}
					<Content movies={[]}/>
				</main>
				<footer>
					<Logo />
				</footer>
			</div>
		);
	}
}