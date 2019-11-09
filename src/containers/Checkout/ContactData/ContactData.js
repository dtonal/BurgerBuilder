import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axiosOrder from '../../../AxiosOrder';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

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
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: { required: true },
                    valid: false,
                    touched: false
                },
                zipcode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Zipcode'
                    },
                    value: '',
                    validation: { required: true, minLength: 5, maxLength: 5 },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Street'
                    },
                    value: '',
                    validation: { required: true },
                    valid: false,
                    touched: false
                },
                city: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your City'
                    },
                    value: '',
                    validation: { required: true },
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Country'
                    },
                    value: '',
                    validation: { required: true },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your mail'
                    },
                    value: '',
                    validation: { required: true },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            { value: 'fastest', displayValue: 'Fastest' },
                            { value: 'cheapest', displayValue: 'Cheapest' },
                        ]
                    },
                    value: 'cheapest',
                    touched: false
                },
            },
            formIsValid: false
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let elId in this.state.orderForm) {
            formData[elId] = this.state.orderForm[elId].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        };
        this.props.onBurgerPurchase(order, this.props.token);
    }

    inputChangedHandler = (event, inputId) => {
        const updatedForm = { ...this.state.orderForm };
        const updatedInput = { ...updatedForm[inputId] };
        updatedInput.value = event.target.value;
        updatedInput.valid = this.checkValidty(updatedInput.value, updatedInput.validation);
        updatedInput.touched = true;
        updatedForm[inputId] = updatedInput;
        let formIsValid = true;
        for (let key in updatedForm) {
            if (updatedForm[key].validation) {
                formIsValid = formIsValid && updatedForm[key].valid;
            }
        }
        console.log("isValid:" + formIsValid);
        this.setState({
            orderForm: updatedForm,
            formIsValid: formIsValid
        })
    }

    checkValidty = (value, rules) => {
        let valid = true;
        if (rules.required) {
            valid = value.trim() !== ''
        }
        if (valid && rules.minLength) {
            valid = value.length >= rules.minLength;
        }
        if (valid && rules.maxLength) {
            valid = value.length <= rules.maxLength;
        }
        return valid;
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
                        changed={(event) => this.inputChangedHandler(event, el.id)}
                        invalid={!el.config.valid}
                        shouldValidate={el.config.validation}
                        touched={el.config.touched} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.props.loading) {
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

const dispatchToProps = dispatch => {
    return {
        onBurgerPurchase: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, dispatchToProps)(withErrorHandler(ContactData, axiosOrder))
