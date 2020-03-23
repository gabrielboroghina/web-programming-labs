const express = require('express');

const BooksService = require('./services.js');
const {
    validateFields
} = require('../utils');
const {
    authorizeAndExtractToken
} = require('../security/Jwt');
const {
    ServerError
} = require('../errors');
const {
    authorizeRoles
} = require('../security/Roles');

const router = express.Router();

router.post('/', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    const {
        name,
        authorId,
        genres
    } = req.body;
    try {
        // do logic

        // validate fields
        const fieldsToBeValidated = {
            name: {
                value: name,
                type: 'ascii'
            },
            authorId: {
                value: authorId,
                type: 'ascii'
            },
            genres: {
                value: genres,
                type: 'string-list'
            }
        };
        validateFields(fieldsToBeValidated);

        // insert the book into the DB
        await BooksService.add(name, authorId, genres);
        res.status(201).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        // pot sa primesc eroare si ca genul nu e bun, trebuie verificat mesajul erorii
        // HINT err.message
        if (err.name === 'ValidationError' && err.errors[Object.keys(err.errors)[0]].path.startsWith('genres'))
            res.status(400).json({error: 'Invalid genre: ' + err.errors[Object.keys(err.errors)[0]].value});
        else
            next(err);
    }
});

router.get('/', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
    try {
        // do logic
        const books = await BooksService.getAll();
        res.send(books);
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.get('/:id', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        // do logic
        const books = await BooksService.getById(id);
        res.send(books);
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.get('/authors/:id', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        // do logic
        const books = await BooksService.getByAuthorId(id);
        res.send(books);
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.put('/:id', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        name,
        authorId,
        genres
    } = req.body;
    try {
        // do logic

        // validate fields
        // allow only a subset of details to be specified
        const fieldsToBeValidated = {};
        if (name)
            fieldsToBeValidated.name = {value: name, type: 'ascii'};
        if (authorId)
            fieldsToBeValidated.authorId = {value: authorId, type: 'ascii'};
        if (genres)
            fieldsToBeValidated.genres = {value: genres, type: 'string-list'};
        validateFields(fieldsToBeValidated);

        await BooksService.updateById(id, name, authorId, genres);
        res.status(200).json({message: 'Book updated'});
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 

        // pot sa primesc eroare si ca genul nu e bun, trebuie verificat mesajul erorii
        // HINT err.message 
        if (err.name === 'ValidationError' && err.errors[Object.keys(err.errors)[0]].path.startsWith('genres'))
            res.status(400).json({error: 'Invalid genre: ' + err.errors[Object.keys(err.errors)[0]].value});
        else
            next(err);
    }
});

router.delete('/:id', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        // do logic
        await BooksService.deleteById(id);
        res.status(200).json({message: 'Book deleted'});
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

module.exports = router;