import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return init state for unknown actionType',
        () => {
            expect(reducer(undefined, {})).toEqual({
                token: null,
                userId: null,
                error: null,
                loading: false,
                redirectPath: '/'
            })
        }
    )

    it('should set token on login', () => {
        expect(
            reducer(undefined,
                {
                    type: actionTypes.AUTH_SUCCESS,
                    token: 'token'
                }
            ).token
        ).toEqual('token')
    })
});