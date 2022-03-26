import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});
//const url = 'http://localhost:5000/forums';

export const fetchForums = (page) => API.get(`/forums?page=${page}`);
export const fetchForum = (id) => API.get(`/forums/${id}`);
export const fetchForumsBySearch = (searchQuery) => API.get(`/forums/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createForum = (newForum) => API.post('/forums', newForum);
export const updateForum = (id, updatedForum) => API.patch(`/forums/${id}`, updatedForum);
export const deleteForum = (id) => API.delete(`/forums/${id}`);
export const likeForum = (value, id) => API.patch(`/forums/${id}/likeForum`, { value });
export const comment = (value, id) => API.post(`/forums/${id}/commentForum`, { value });

export const createComment = (newComment, id) => API.post(`/forums/${id}`, newComment);
export const deleteComment = (id) => API.delete(`/forums/comments/${id}`);

export const signIn = (formData) => API.post('/user/login', formData);
export const signUp = (formData) => API.post('/user/register', formData);