const {
    Books
} = require('../data');
const {
    ServerError
} = require('../errors');

const add = async (name, authorId, genres) => {
    // create new Book obj
    const book = new Books({
        name,
        author: authorId,
        genres
    });

    // save it
    await book.save();
};

const summarizeAuthor = (book) => {
    book._doc.author = book.author.firstName + ' ' + book.author.lastName;
};

const getAll = async () => {
    // get all books
    // populate 'author' field
    const books = await Books.find().populate('author', 'firstName lastName -_id');

    // modify output so author is made of 'author.firstName author.lastName'
    for (const book of books)
        summarizeAuthor(book);
    return books;
};

const getById = async (id) => {
    // get book by id
    // populate 'author' field
    const book = await Books.findById(id).populate('author', 'firstName lastName -_id');
    if (book === null)
        throw new ServerError(`No book with the id ${id} exists`, 404);

    // modify output so author is made of 'author.firstName author.lastName'
    if (book)
        summarizeAuthor(book);
    return book;
};

const getByAuthorId = async (id) => {
    // get book by author id
    const books = await Books.find({author: id}).populate('author', 'firstName lastName -_id');

    // modify output so author is made of 'author.firstName author.lastName'
    for (const book of books)
        summarizeAuthor(book);
    return books;
};

const updateById = async (id, name, authorId, genres) => {
    // update by id
    if (await Books.findById(id) === null)
        throw new ServerError(`No book with the id ${id} exists`, 404);

    // update only the requested details
    const updatedBook = {};
    if (name) updatedBook.name = name;
    if (authorId) updatedBook.author = authorId;
    if (genres) updatedBook.genres = genres;

    await Books.updateOne({_id: id}, {$set: updatedBook}, {runValidators: true});
};

const deleteById = async (id) => {
    // delete by id
    await Books.findByIdAndDelete(id);
};

module.exports = {
    add,
    getAll,
    getById,
    getByAuthorId,
    updateById,
    deleteById
};