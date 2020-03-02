const express = require('express');
const libraryRouter = require('./library-router');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/library', libraryRouter);

app.listen(port, () => {
    console.log('App listening on port 3000');
});