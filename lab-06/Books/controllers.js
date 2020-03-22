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
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        // pot sa primesc eroare si ca genul nu e bun, trebuie verificat mesajul erorii
        // HINT err.message
        next(err);
    }
});

router.get('/', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
    try {
        // do logic
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
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 

        // pot sa primesc eroare si ca genul nu e bun, trebuie verificat mesajul erorii
        // HINT err.message 
        next(err);
    }
});

router.delete('/:id', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        // do logic
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

module.exports = router;