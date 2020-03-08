const express = require('express');
const db = require('./data/index');

const router = express.Router();

router.get('/books', async (req, res, next) => {
    const data = await db.query('select * from books');
    res.status(200).send(data);
    next();
});

router.get('/books/:id', async (req, res, next) => {
    const data = await db.query('select * from books where id = $1', [parseInt(req.params.id)]);
    console.log(data);
    res.status(200).send(data);
    next();
});

router.post('/books', async (req, res, next) => {
    const bookEntry = req.body;
    console.log(bookEntry);
    try {
        await db.query('insert into books(name, author_id) values($1, $2)',
            [bookEntry.name, parseInt(bookEntry.author_id)]);
        res.status(201).json({description: "Book inserted into DB"});
    } catch (err) {
        res.status(500).json({description: "Error occurred"});
        next(err);
    }
});

module.exports = router;