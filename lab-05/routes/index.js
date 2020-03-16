const Router = require('express')();

const AuthorsController = require('../Authors/controllers.js');
const UsersController = require('../Users/controllers');
const BooksController = require('../books/controllers.js');
const PublishersController = require('../publishers/controllers.js');

Router.use('/authors', AuthorsController);
Router.use('/users', UsersController);
Router.use('/books', BooksController);
Router.use('/publishers', PublishersController);

module.exports = Router;