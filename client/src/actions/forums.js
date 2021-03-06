import { FETCH_ALL, FETCH_FORUM, FETCH_BY_SEARCH, FETCH_BY_USER, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING, COMMENT } from '../constants/actionTypes';
import * as api from '../api/index.js';

// Action Creators
export const getForum = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchForum(id);
        dispatch({ type: FETCH_FORUM, payload: data[0] });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};
export const getCommentsFromForum = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchForum(id);
        dispatch({ type: FETCH_FORUM, payload: data[0] });
        console.log(data[0].comments);
        return data[0].comments;
    } catch (error) {
        console.log(error);
    }
};

export const getForums = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchForums(page);
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
        console.log(page);
    }
};

export const getForumsByUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchForumsByUser(userId);
        dispatch({ type: FETCH_BY_USER, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const getForumsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchForumsBySearch(searchQuery);
        
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createForum = (forum, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createForum(forum);
        history(`/forums/${data._id}`);
        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const updateForum = (id, forum) => async (dispatch) => {
    try {
        const { data } = await api.updateForum(id, forum);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteForum = (id) => async (dispatch) => {
    try {
        await api.deleteForum(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};

export const likeForum = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.likeForum(value, id);
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const commentForum = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);
        dispatch({ type: COMMENT, payload: data });
        return data.comments;
    } catch (error) {
        console.log(error);
    }
};

export const getStackoverflowAnswers = (query) => async (dispatch) => {
    try {
        const { data } = await api.fetchStackoverflowAnswers(query);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};