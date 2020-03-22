const {
    Books
} = require('../data');

const add = async (name, authorId, genres) => {
    // create new Book obj
    // save it
};

const getAll = async () => {
    // get all books
    // populate 'author' field
    // modify output so author is made of 'author.firstName author.lastName'
};

const getById = async (id) => {
    // get book by id
    // populate 'author' field
    // modify output so author is made of 'author.firstName author.lastName'
};

const getByAuthorId = async (id) => {
    // get book by author id
    // modify output so author is made of 'author.firstName author.lastName'
};

const updateById = async (id, name, authorId, genres) => {
    // update by id
};

const deleteById = async (id) => {
    // delete by id
};

module.exports = {
    add,
    getAll,
    getById,
    getByAuthorId,
    updateById,
    deleteById
}