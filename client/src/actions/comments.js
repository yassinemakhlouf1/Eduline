import { COMMENT2, DELETE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const createComment = (comment, id, history) => async (dispatch) => {
    try {
        const { data } = await api.createComment(comment, id);
        dispatch({ type: COMMENT2, payload: data });
        history(`/forums/${data.forumid}`);
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