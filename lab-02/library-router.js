const express = require('express');
const router = express.Router();
const database = require('./database');

// Get book by ID
router.get('/:id', (req, res) => {
    try {
        const book = database.getFromDbById(parseInt(req.params.id));
        res.status(200).json(book);
    } catch (err) {
        res.status(404).json({description: "No books with the given ID"});
    }
});

// Get book by author
router.get('/', (req, res) => {
    try {
        if (req.query.author) {
            const books = database.getFromDbByAuthor(req.query.author);
            res.status(200).json(books);
        } else {
            const books = database.getAllFromDb();
            res.status(200).json(books);
        }
    } catch (err) {
        res.status(404).json({description: "No books with the given author"});
    }
});

// Add book
router.post('/', (req, res) => {
    const bookEntry = req.body;
    try {
        database.insertIntoDb(bookEntry);
        res.status(201).json({description: "Book inserted into DB"});
    } catch (err) {
        res.status(500).json({description: "Error occurred"});
    }
});

// Update book
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        database.getFromDbById(id);
        database.updateById(id, {id: req.params.id, ...req.body});
        res.status(201).json({description: "Book details updated"});
    } catch (err) {
        res.status(404).json({description: "No book with the given ID"});
    }
});

// Delete book by id
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        database.removeFromDbById(id);
        res.status(200).json({description: "Book deleted"});
    } catch (err) {
        res.status(500).end();
    }
});

// Delete books
router.delete('/', (req, res) => {
    if (req.query.author) {
        database.removeFromDbByAuthor(req.query.author);
        res.status(200).json({description: "Books deleted"});
    } else {
        // delete all database
        database.purgeDb();
        res.status(200).json({description: "Database purged"});
    }
});

module.exports = router;