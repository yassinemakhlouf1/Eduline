import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_FORUM, COMMENT } from '../constants/actionTypes';

export default (state = { isLoading: true, forums: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                forums: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return {
                ...state,
                forums: action.payload,
            };
        case FETCH_FORUM:
            return {
                ...state,
                forum: action.payload,
            };   
        case DELETE:
            return { ...state, forums: state.forums.filter((forum) => forum._id !== action.payload) };
        case UPDATE:
        case LIKE:
            return { ...state, forums: state.forums.map((forum) => forum._id === action.payload._id ? action.payload : forum) };
        case COMMENT:
            return { ...state, forums: state.forums.map((forum) => forum._id === action.payload._id ? action.payload : forum) };
        case CREATE:
            return { ...state, forums: [...state.forums, action.payload] };
        default:
            return state;
    }
};