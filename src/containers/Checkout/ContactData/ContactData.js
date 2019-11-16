import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axiosOrder from '../../../AxiosOrder';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidty } from '../../../shared/utility';

import classes from './ContactData.module.css';

const ContactData = props => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [orderForm, setOrderForm] = useState(
        {
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
        }
    );


    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let elId in orderForm) {
            formData[elId] = orderForm[elId].value;
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        };
        props.onBurgerPurchase(order, props.token);
    }

    const inputChangedHandler = (event, inputId) => {
        const updatedInput = updateObject(orderForm[inputId], {
            value: event.target.value,
            valid: checkValidty(event.target.value, orderForm[inputId].validation),
            touched: true
        })
        const updatedForm = updateObject(orderForm,
            {
                [inputId]: updatedInput
            })
        let formIsValid = true;
        for (let key in updatedForm) {
            if (updatedForm[key].validation) {
                formIsValid = formIsValid && updatedForm[key].valid;
            }
        }
        setOrderForm(updatedForm);
        setFormIsValid(formIsValid);
    }

    const formElements = [];

    for (let key in orderForm) {
        formElements.push(
            {
                id: key,
                config: orderForm[key]
            });
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElements.map(el => (
                <Input
                    key={el.id}
                    elementType={el.config.elementType}
                    elementConfig={el.config.elementConfig}
                    value={el.config.value}
                    changed={(event) => inputChangedHandler(event, el.id)}
                    invalid={!el.config.valid}
                    shouldValidate={el.config.validation}
                    touched={el.config.touched} />
            ))}
            <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>
    )
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
