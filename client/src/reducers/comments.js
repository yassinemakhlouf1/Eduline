import { COMMENT2, DELETE } from '../constants/actionTypes';

export default (state = { isLoading: true, comments: [] }, action) => {
    switch (action.type) {
        case DELETE:
            return { ...state, comments: state.comments.filter((comment) => comment._id !== action.payload) };
        case COMMENT2:
            return { ...state, comments: [...state.comments, action.payload] };
        default:
            return state;
    }
};