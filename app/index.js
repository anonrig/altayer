const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;


app
  .use(serveStatic('build', {'index': ['index.html']}));

app
  .get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/build/index.html'));
  });

app
  .get('/*', (req, res, next) => {
    res.redirect('/');
  });

app.listen(PORT, () => {
  console.info(`Application started listening on port ${PORT}`)
});