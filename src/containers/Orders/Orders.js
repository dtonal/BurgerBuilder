import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axiosOrder from '../../AxiosOrder'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: null,
            loading: true   
        }
    }

    componentDidMount(){

        axiosOrder.get("/orders.json").then(response => {
            const fetchedData = [];
            for(let key in response.data){
                fetchedData.push({...response.data[key], id: key});
            }
            console.log(fetchedData);
            this.setState({
                orders: fetchedData,
                loading: false
            })
        }).catch(error => {
            console.log("error: " + error);
            this.setState({
                loading: false
            })
        })
    }

    render() {
        let orders=<p>loading</p>
        if(!this.state.loading && this.state.orders){
            orders = this.state.orders.map(order => {
                return <Order key={order.id} price={order.price} ingredients={order.ingredients}/>;
            });
        }
        return (
            <div>
                {orders}         
            </div>
        )
    }
}

export default withErrorHandler(Orders,axiosOrder)
