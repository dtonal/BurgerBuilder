import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axiosOrder from '../../../AxiosOrder';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name',
                        value: ''
                    }
                },
                zipcode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Zipcode',
                        value: ''
                    }
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Street',
                        value: ''
                    }
                },
                city: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your City',
                        value: ''
                    }
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Country',
                        value: ''
                    }
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your mail',
                        value: ''
                    }
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            { value: 'fastest', displayValue: 'Fastest' },
                            { value: 'cheapest', displayValue: 'Cheapest' },
                        ],
                        value: ''
                    }
                },
            }
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({ loading: true });
        const formData = {};
        for (let elId in this.state.orderForm) {
            formData[elId] = this.state.orderForm[elId].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
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

    inputChangedHandler = (event, inputId) => {
        console.log(event);
        const updatedForm = { ...this.state.orderForm };
        const updatedInput = { ...updatedForm[inputId] };
        updatedInput.value = event.target.value;
        updatedForm[inputId] = updatedInput;
        this.setState({ orderForm: updatedForm })
    }

    render() {
        const formElements = [];

        for (let key in this.state.orderForm) {
            formElements.push(
                {
                    id: key,
                    config: this.state.orderForm[key]
                });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(el => (
                    <Input
                        key={el.id}
                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        changed={(event) => this.inputChangedHandler(event, el.id)} />
                ))}
                <Button btnType="Success">ORDER</Button>
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
