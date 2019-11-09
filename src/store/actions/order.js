import * as actionTypes from './actionTypes';
import axios from '../../AxiosOrder';

export const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: orderId,
        orderData: orderData
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_ERROR,
        error: error
    }
}

export const purchaseBurgerStart = (orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_STARTED
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
}


export const fetchOrdersInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    }
}


export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersError = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_ERROR,
        error: error
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = 'auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get("/orders.json?" + queryParams).then(response => {
            const fetchedData = [];
            for (let key in response.data) {
                fetchedData.push({ ...response.data[key], id: key });
            }
            dispatch(fetchOrdersSuccess(fetchedData));
        }).catch(error => {
            dispatch(fetchOrdersError(error));
        })
    }
}