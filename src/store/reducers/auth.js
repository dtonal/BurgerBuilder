import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    redirectPath: '/'
}

const authStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    }
    );
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        token: action.token,
        userId: action.userId
    })
}

const authFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null
    })
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        redirectPath: action.path
    })
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action)
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)
        case actionTypes.AUTH_FAILED:
            return authFailed(state, action)
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action)
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action)
        default:
            return state;
    }
}


export default reducer;