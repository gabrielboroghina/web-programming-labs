const {
    query
} = require('../data');

const {
    generateToken,
} = require('../security/Jwt');

const {
    ServerError
} = require('../errors');

const {
    hash,
    compare
} = require('../security/Password');

const addRole = async (value) => {
    try {
        await query('INSERT INTO roles (value) VALUES ($1)', [value]);
    } catch (err) {
        throw new ServerError(err.detail, 500);
    }
};

const getRoles = async () => {
    return await query('SELECT * FROM roles order by id');
};

const add = async (username, password, role_id) => {
    // pas 1: cripteaza parola
    const encryptedPassword = await hash(password);

    // pas 2: adauga (username, parola criptata, role_id) in baza de date
    try {
        await query('INSERT INTO users (username, password, role_id) VALUES ($1, $2, $3)', [username, encryptedPassword, role_id]);
    } catch (err) {
        throw new ServerError(err.detail, 500);
    }
};

const authenticate = async (username, password) => {
    const result = await query(`SELECT u.id, u.password, r.value as role FROM users u 
                                JOIN roles r ON r.id = u.role_id
                                WHERE u.username = $1`, [username]);
    if (result.length === 0) {
        throw new ServerError(`Utilizatorul cu username ${username} nu exista in sistem!`, 400);
    }
    const user = result[0];

    // pas 1: verifica daca parola este buna (hint: functia compare)
    // pas 1.1.: compare returneaza true sau false. Daca parola nu e buna, arunca eroare
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid)
        throw new ServerError("Authentication failed", 403);

    // pas 2: genereaza token cu payload-ul: {userId si userRole}
    const token = await generateToken({userId: user.id, userRole: user.role});

    // pas 3: returneaza token
    return token;
};

module.exports = {
    add,
    addRole,
    getRoles,
    authenticate
};