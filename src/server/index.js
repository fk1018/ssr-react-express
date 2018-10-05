import express from 'express';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import React from 'react';
import serialize from 'serialize-javascript';
import App from '../shared/App';
import fetchPopularRepos from '../shared/api';

const app = express();

app.use(cors());

app.use(express.static('public'));

app.get('*', (req, res, next) => {
  fetchPopularRepos()
    .then((data) => {
      const markup = renderToString(
        <App data={data} />,
      );
      res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR React Application</title>
          <script src='/bundle.js' defer></script>
          <script>window.INITIAL_DATA = ${serialize(data)}</script>
        </head>
  
        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `);
      next();
    })
    .catch((error) => {
      console.warn(error);
      return null;
    });
});

app.listen(3000, () => { });
