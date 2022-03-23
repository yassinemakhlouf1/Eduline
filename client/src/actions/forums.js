import { FETCH_ALL, FETCH_FORUM, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING, COMMENT } from '../constants/actionTypes';
import * as api from '../api/index.js';

// Action Creators
export const getForum = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchForum(id);
        //console.log(data);
        dispatch({ type: FETCH_FORUM, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const getForums = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchForums(page);
        //console.log(data);
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
        console.log(page);
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

export const likeForum = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeForum(id);
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const commentForum = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);
        //console.log(data);
        dispatch({ type: COMMENT, payload: data });
        return data.comments;
    } catch (error) {
        console.log(error);
    }
};