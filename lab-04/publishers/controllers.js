const express = require('express');

const publishersDbBridge = require('./services.js');
const {
    validateFields
} = require('../utils');
const {
    ServerError
} = require('../errors');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const data = await publishersDbBridge.getAll();
    res.status(200).send(data);
});

router.get('/:id', async (req, res, next) => {
    const publisherId = parse(req.params.id);
    const data = await publishersDbBridge.getById(publisherId);
    res.status(200).send(data);
});

router.post('/', async (req, res, next) => {
    const publisherEntry = req.body;
    try {
        await publishersDbBridge.add(publisherEntry.name);
        res.status(201).json({description: "Publisher created"});
    } catch (err) {
        res.status(500).json({description: "Error occurred"});
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    const newName = req.body.name;
    try {
        await publishersDbBridge.updateById(parseInt(req.params.id), newName);
        res.status(200).send('Publisher name updated!');
    } catch (err) {
        res.status(500).send('Error occurred');
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    const bookId = parseInt(req.params.id);
    try {
        await publishersDbBridge.deleteById(bookId);
        res.status(200).send('Publisher deleted');
    } catch (err) {
        next(err);
        res.status(500).send('Error occurred');
    }
});

module.exports = router;