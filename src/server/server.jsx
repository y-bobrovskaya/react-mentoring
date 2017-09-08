import Express from 'express'
import React from 'react'
import MyApp from '../client/app'
import {renderToString} from 'react-dom/server'

const app = Express()
const port = 4300

//Serve static files
app.use('/static', Express.static('static'))

// This is fired every time the server side receives a request
app.use(handleRender)

function handleRender(req, res) {
	const html = renderToString(
			<MyApp />
)

	// Send the rendered page back to the client
	res.send(renderFullPage(html))
}

function renderFullPage(html) {
	return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port)