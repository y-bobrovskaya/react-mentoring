import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Logo } from '../components/Logo';

export class MyApp extends React.Component {
	render() {
		return (
			<Provider store={this.props.store}>
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
			</Provider>
		);
	}
}

MyApp.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line
};
