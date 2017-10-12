import React from 'react'
import { Logo } from '../components/Logo';

export class MyApp extends React.Component {
	render() {
		return (
			<div className="page-wrapper">
				<header>
					<Logo />
				</header>
				<main>
					{this.props.children}
				</main>
				<footer>
					<Logo />
				</footer>
			</div>
		);
	}
}