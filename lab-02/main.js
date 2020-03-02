const express = require('express');
const moment = require('moment');

const app = express();

app.get('/', (req, res) => {
    const date = moment(new Date()).format('YYYY-MM-DDThh:mm:ss');
    res.send(date);
});

const port = 3000;

app.listen(port);
console.log('Server started! At http://localhost:' + port);