import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDom from 'react-dom';
import { MyApp } from './app';

const render = () => {
	ReactDom.render(
		<AppContainer>
			<MyApp />
		</AppContainer>,
		document.getElementById('app')
	)
};

render();

if (module.hot) {
	module.hot.accept('./app', render);
}
