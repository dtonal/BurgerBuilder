import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId })
    return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    })
}

const purchaseBurgerError = (state, action) => {
    return updateObject(state, { loading: false })
}

const purchaseBurgerStarted = (state, action) => {
    return updateObject(state, { loading: true })
}

const purchaseBurgerInit = (state, action) => {
    return updateObject(state, { purchased: false });
}

const fetchOrderStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, { orders: action.orders, loading: false })
}

const fetchOrderError = (state, action) => {
    return updateObject(state, { error: action.error, loading: false })
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_ERROR:
            return purchaseBurgerError(state, action);
        case actionTypes.PURCHASE_BURGER_STARTED:
            return purchaseBurgerStarted(state, action)
        case actionTypes.PURCHASE_BURGER_INIT:
            return purchaseBurgerInit(state, action)
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrderStart(state, action)
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrderSuccess(state, action)
        case actionTypes.FETCH_ORDERS_ERROR:
            return fetchOrderError(state, action)

        default:
            return state
    }
}

export default reducer;