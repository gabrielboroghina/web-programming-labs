import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

const getAlbums = () => {
    return axios.get(`${API_URL}/albums`);
};

const getPhotos = async () => {
    const result = await axios.get(`${API_URL}/photos`);
    return result.data;
};

const getAlbumPhotos = (albumId) => {
    return axios.get(`${API_URL}/albums/${albumId}/photos`);
};

const getUsers = async () => {
    const result = await axios.get(`${API_URL}/users`);
    return result.data;
};

export default {
    getAlbums,
    getAlbumPhotos,
    getUsers,
    getPhotos,
}