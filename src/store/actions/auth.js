import * as actionTypes from './actionTypes';
import axios from 'axios';
import { apiKey } from '../../config/config';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        console.log("auth " + email + "/" + password);
        dispatch(authStart());
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey
        }
        axios.post(url, {
            email: email,
            password: password,
            returnSecureToken: true
        })
            .then(
                response => {
                    console.log(response);
                    localStorage.setItem('token', response.data.idToken)
                    localStorage.setItem('userId', response.data.localId)
                    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                    localStorage.setItem('expirationDate', expirationDate)
                    dispatch(authSuccess(response.data.idToken, response.data.localId))
                    dispatch(checkOffTimeOut(response.data.expiresIn))
                }
            )
            .catch(
                error => {
                    console.log(error);
                    dispatch(authFail(error.response.data.error))
                });
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const setAuthRedirectPath = (path) => {
    console.log('action: setAuthRedirectPath - ' + path);
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

const checkOffTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }
            , expirationTime * 1000);
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        console.log('authCheckState.token: ' + token);
        console.log('authCheckState.userId: ' + userId);
        if (!token || !userId) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, userId))
                dispatch(checkOffTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }


    }
}


            //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]