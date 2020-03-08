const {
    query
} = require('../data');

const add = async (name, author_id) => {
    await query('INSERT INTO books (name, author_id) VALUES ($1, $2)', [name, author_id]);
};

const getAll = async () => {
    const sql = `select b.id, b.name book, p.name publisher from books b join publishers_books pb on b.id = pb.book_id
                join publishers p on p.id = pb.publisher_id`;
    const res = await query(sql);
    return res;
    // return await query('SELECT * FROM books');
};

const getById = async (id) => {
    const sql = `select b.id, b.name book, p.name publisher from books b join publishers_books pb on b.id = pb.book_id
                join publishers p on p.id = pb.publisher_id where b.id = $1`;
    return await query(sql, [id]);
};

const updateById = async (id, name) => {
    await query('UPDATE books SET name = $1 WHERE id = $2', [name, id]);
};

const deleteById = async (id) => {
    await query('DELETE FROM books WHERE id = $1', [id]);
};

module.exports = {
    add,
    getAll,
    getById,
    updateById,
    deleteById
};