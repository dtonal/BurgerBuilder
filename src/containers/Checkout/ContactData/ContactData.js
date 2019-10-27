import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axiosOrder from '../../../AxiosOrder';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            name: '',
            email: '',
            adress: {
                street: '',
                postalCode: ''
            }
        }
    }

    onClickHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Torben',
                age: 29,
                adress: {
                    zipcode: 21337,
                    street: 'sesamstreet',
                    city: 'mytown'
                },
                email: 'mymail@mail.com'
            },
            deliveryMethod: 'fastest'
        };

        axiosOrder.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            })
    }

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your name" />
                <input type="text" name="email" placeholder="Your E-Mail" />
                <input type="text" name="street" placeholder="Your Street" />
                <input type="text" name="postalcode" placeholder="Your Postalcode" />
                <Button btnType="Success" onClick={this.onClickHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData
