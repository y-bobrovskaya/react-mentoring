import Express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import createStore from '../redux/store';
import {MyApp} from '../client/app';
import routes from '../routes';

const app = Express();
const port = 4300;

//Serve static files
app.use('/static', Express.static('static'));

// This is fired every time the server side receives a request
app.use(handleRender);

function handleRender(req, res) {
	const store = createStore();
	const context = {};
	const app = (
		<StaticRouter location={req.url} context={context}>
			<MyApp store={store}>
				{routes}
			</MyApp>
		</StaticRouter>);

	const html = renderToString(app);

	// Send the rendered page back to the client
	res.send(renderFullPage(html, {}))
}

function renderFullPage(html, preloadedState) {
	return `
	<!DOCTYPE html>
	<html>
	 <head>
	  <title>Redux Universal Example</title>
	  <meta charset="utf-8">
		 <base href="/">
	 <link href="static/styles.css" rel="stylesheet"></head>
	 <body>
		 <div class="app-wrapper" id="app">${html}</div>
		 <script>
        	window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
	 <script type="text/javascript" src="static/client.js"></script><script type="text/javascript" src="static/styles.js"></script></body>
	</html>`
}

app.listen(port);