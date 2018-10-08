import express from 'express';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { matchPath } from 'react-router-dom';
import serialize from 'serialize-javascript';
import App from '../shared/App';
import fetchPopularRepos from '../shared/api';
import routes from '../shared/routes';


const app = express();

app.use(cors());

app.use(express.static('public'));

app.get('*', (req, res, next) => {
  const activeRoute = routes.find(route => matchPath(req.url, route)) || {};
  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.push)
    : Promise.resolve();

  promise
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
    })
    .catch(next);
});

app.listen(3000, () => { });
