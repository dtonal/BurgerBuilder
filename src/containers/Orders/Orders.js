import React, { useEffect } from 'react'
import Order from '../../components/Order/Order'
import axiosOrder from '../../AxiosOrder'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {

    useEffect(
        () => props.onFetchOrders(props.token, props.userId),
        [props.token, props.userId]);


    let orders = <Spinner />
    if (!props.loading && props.orders) {
        orders = props.orders.map(order => {
            return <Order key={order.id} price={order.price} ingredients={order.ingredients} />;
        });
    }
    return (
        <div>
            {orders}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosOrder));
