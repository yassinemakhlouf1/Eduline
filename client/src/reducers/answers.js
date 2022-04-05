import { ANSWER, DELETE, PLUSV, MOINV } from '../constants/actionTypes';

export default (state = { isLoading: true, answers: [] }, action) => {
    switch (action.type) {
        case DELETE:
            return { ...state, answers: state.answers.filter((answer) => answer._id !== action.payload) };
        case ANSWER:
            return { ...state, answers: [...state.answers, action.payload] };
        case PLUSV:
        case MOINV:
            return { ...state, answers: state.answers.map((answer) => answer._id === action.payload._id ? action.payload : answer) };
        default:
            return state;
    }
};