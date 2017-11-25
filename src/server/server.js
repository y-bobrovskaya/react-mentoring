import Express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import createStore from '../redux/store';
import MyApp from '../client/app';

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
	<Provider store={store}>
		<StaticRouter location={req.url} context={context}>
			<MyApp />
		</StaticRouter>
	</Provider>);

	const html = renderToString(app);

	// Send the rendered page back to the client
	res.send(renderFullPage(html))
}

function renderFullPage(html, preloadedState) {
	return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
        	window.PRELOADED_STATE = ${JSON.stringify(preloadedState.replace(/</g, '\\u003c'))}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port);