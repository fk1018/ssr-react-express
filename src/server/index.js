import express from 'express';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import React from 'react';
import serialize from 'serialize-javascript';
import App from '../shared/App';

const app = express();

app.use(cors());

app.use(express.static('public'));

app.get('*', (req, res, next) => {
  const name = 'Fred';
  const markup = renderToString(
    <App data={name} />,
  );

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR React Application</title>
        <script src='/bundle.js' defer></script>
        <script>window.INITIAL_DATA = ${serialize(name)}</script>
      </head>

      <body>
        <div id="app">${markup}</div>
      </body>
    </html>
  `);
  next();
});

app.listen(3000, () => {});
