const Router = require('express')();

const AuthorsController = require('../Authors/controllers.js');
const UsersController = require('../Users/controllers');

Router.use('/authors', AuthorsController);
Router.use('/users', UsersController);

module.exports = Router;