const Router = require('express')();

const AuthorsController = require('../Authors/controllers.js');
const BooksController = require('../books/controllers.js');
const PublishersController = require('../publishers/controllers.js');

Router.use('/authors', AuthorsController);
Router.use('/books', BooksController);
Router.use('/publishers', PublishersController);

module.exports = Router;