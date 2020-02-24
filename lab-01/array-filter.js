const arraySum = require('./array-sum');

function filterByParity(array, parNum) {
    return arraySum.sum(array.filter(val => val % 2 === parNum % 2));
}

module.exports = {
    filterByParity
};