const express = require('express');
const db = require('../data/index');

const booksDbBridge = require('./services.js');
const {
    validateFields
} = require('../utils');
const {
    ServerError
} = require('../errors');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const data = await booksDbBridge.getAll();
    res.status(200).send(data);
});

router.get('/:id', async (req, res, next) => {
    const bookId = parseInt(req.params.id);
    const data = await booksDbBridge.getById(bookId);
    res.status(200).send(data);
});

router.post('/', async (req, res, next) => {
    const bookEntry = req.body;
    try {
        await booksDbBridge.add(bookEntry.name, parseInt(bookEntry.author_id));
        res.status(201).json({description: "Book inserted into DB"});
    } catch (err) {
        res.status(500).json({description: "Error occurred"});
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    const newName = req.body.name;
    try {
        await booksDbBridge.updateById(parseInt(req.params.id), newName);
        res.status(200).send('Book name updated!');
    } catch (err) {
        res.status(500).send('Error occurred');
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    const bookId = parseInt(req.params.id);
    try {
        await booksDbBridge.deleteById(bookId);
        res.status(200).send('Book deleted');
    } catch (err) {
        next(err);
        res.status(500).send('Error occurred');
    }
});

module.exports = router;