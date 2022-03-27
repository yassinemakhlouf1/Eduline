import { COMMENT2, DELETE } from '../constants/actionTypes';
import * as api from '../api/index.js';
import { getForum } from './forums';

export const createComment = (comment, id) => async (dispatch) => {
    try {
        const { data } = await api.createComment(comment, id);
        dispatch({ type: COMMENT2, payload: data });
        //const { forum } = getForum(id);
        //console.log(forum);
    } catch (error) {
        console.log(error);
    }
};


export const deleteComment = (id) => async (dispatch) => {
    try {
        await api.deleteComment(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};