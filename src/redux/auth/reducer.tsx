import {
    USER_LOADED, 
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT
} from '../action_types';

const INIT_STATE = {
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token') ? true : false,
    loading: false,
    user: {
        email: ''
    },
    githubState: null,
    error: null,
};

const authReducer = (state = INIT_STATE, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
            return {
              ...state,
              isAuthenticated: true,
              loading: false,
              user: payload
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: {},
            };
        default: return { ...state };
    }
}

export default authReducer;