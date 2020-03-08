const {
    query
} = require('../data');

const add = async (name) => {
    await query('INSERT INTO publishers (name) VALUES ($1)', [name]);
};

const getAll = async () => {
    const sql = `select p.id, p.name publisher, b.name book from books b join publishers_books pb on b.id = pb.book_id
                join publishers p on p.id = pb.publisher_id`;
    return await query(sql);
};

const getById = async (id) => {
    return await query('SELECT * FROM publishers WHERE id = $1', [id]);
};

const updateById = async (id, name) => {
    await query('UPDATE publishers SET name = $1 WHERE id = $2', [name, id]);
};

const deleteById = async (id) => {
    await query('DELETE FROM publishers WHERE id = $1', [id]);
};

module.exports = {
    add,
    getAll,
    getById,
    updateById,
    deleteById
};