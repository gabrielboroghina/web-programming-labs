let myArray = [];

const insertIntoDb = (obj) => {
    myArray.push(obj);
};

const getAllFromDb = () => {
    return myArray;
};

const getFromDbById = (id) => {
    const obj = myArray.find(el => el.id === id);
    if (obj !== undefined) {
        return obj;
    }
    throw new Error(`The object with the id = ${id} does not exists!`);
};

const getFromDbByAuthor = (author) => {
    const books = myArray.filter(el => el.author === author);
    if (books !== undefined) {
        return books;
    }
    throw new Error(`There are no books with author ${author}`);
};

const updateById = (id, payload) => {
    const elemIndex = myArray.findIndex(el => el.id === id);
    if (elemIndex > -1) {
        myArray[elemIndex] = payload;
    } else {
        throw new Error(`The object with the id = ${id} does not exists!`);
    }
};

const removeFromDbById = (id) => {
    const newArray = myArray.filter(el => el.id !== id);
    myArray = newArray;
};

const removeFromDbByAuthor = (author) => {
    const newArray = myArray.filter(el => el.author !== author);
    myArray = newArray;
};

const purgeDb = () => {
    myArray = [];
};

module.exports = {
    insertIntoDb,
    getAllFromDb,
    getFromDbById,
    getFromDbByAuthor,
    updateById,
    removeFromDbById,
    removeFromDbByAuthor,
    purgeDb
};