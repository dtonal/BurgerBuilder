import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axiosOrder from '../../AxiosOrder'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner />
        if (!this.props.loading && this.props.orders) {
            orders = this.props.orders.map(order => {
                return <Order key={order.id} price={order.price} ingredients={order.ingredients} />;
            });
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosOrder));
