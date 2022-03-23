import { COMMENT2 } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const createComment = (comment, history) => async (dispatch) => {
    try {
        const { data } = await api.createComment(comment);
        history(`/forums/${data.forum}/comment`);
        dispatch({ type: COMMENT2, payload: data });
    } catch (error) {
        console.log(error);
    }
};
