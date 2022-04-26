import { ANSWER, DELETE, PLUSV, MOINV } from '../constants/actionTypes';
import * as api from '../api/index.js';
import { getForum } from './forums';

export const createAnswer = (answer) => async (dispatch) => {
    try {
        const { data } = await api.createAnswer(answer);
        dispatch({ type: ANSWER, payload: data });
        const forum = await api.fetchForum(data.forumid);
        return forum.data[0].answersDetails;
    } catch (error) {
        console.log(error);
    }
};


export const deleteAnswer = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteAnswer(id);
        dispatch({ type: DELETE, payload: id });
        const forum = await api.fetchForum(data.forumid);
        console.log(forum.data[0].answersDetails);
        return forum.data[0].answersDetails;
    } catch (error) {
        console.log(error);
    }
};

export const PlusVote = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.plusVote(value, id);
        dispatch({ type: PLUSV, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const MoinVote = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.moinVote(value, id);
        dispatch({ type: MOINV, payload: data });
    } catch (error) {
        console.log(error);
    }
};