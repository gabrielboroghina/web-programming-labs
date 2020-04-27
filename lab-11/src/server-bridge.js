import axios from "axios";

const API_URL = 'http://localhost:3000/api/v1';

export async function registerUser(data) {
    return axios.post(API_URL + '/users/register', data);
}

export async function loginUser(data) {
    return axios.post(API_URL + '/users/login', data);
}

function getToken() {
    const token = localStorage.getItem("token");
    if (!token)
        throw new Error("You need to login first");
    return token;
}

export async function getBooks() {
    const token = getToken();
    return axios.get(API_URL + '/books', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function getAuthors() {
    const token = getToken();
    return axios.get(API_URL + '/authors', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function addBook(book) {
    const token = getToken();
    return axios.post(API_URL + '/books', book, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function addAuthor(author) {
    const token = getToken();
    return axios.post(API_URL + '/authors', author, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function deleteAuthor(id) {
    const token = getToken();
    return axios.delete(API_URL + `/authors/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}