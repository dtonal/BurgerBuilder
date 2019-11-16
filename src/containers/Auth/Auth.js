import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidty } from '../../shared/utility';


const Auth = (props) => {

    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your mail adress'
            },
            value: '',
            validation: { required: true, isEmail: true },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: { required: true, minLength: 6 },
            valid: false,
            touched: false
        }
    });

    const [isSignup, setSignup] = useState(false);

    useEffect(() => {
        if (!props.building) {
            props.onSetAuthRedirectPath("/");
        }
    }, [props.building, props.onSetAuthRedirectPath]);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(
            controls,
            {
                [controlName]: updateObject(
                    controls[controlName],
                    {
                        value: event.target.value,
                        valid: checkValidty(event.target.value, controls[controlName].validation),
                        touched: true
                    })
            });
        setControls(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.submit(controls.email.value, controls.password.value, isSignup)
    }

    const switchSignup = () => { setSignup(!isSignup) };

    const formElements = [];

    for (let key in controls) {
        formElements.push(
            {
                id: key,
                config: controls[key]
            });
    }

    const formInputs = formElements.map(el => (
        <Input
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            changed={(event) => inputChangedHandler(event, el.id)}
            invalid={!el.config.valid}
            shouldValidate={el.config.validation}
            touched={el.config.touched} />
    ))

    let formElement = <Spinner />
    let errorMessage = null;

    if (props.error) {
        errorMessage = (<p>{props.error.message}</p>);
    }

    if (!props.loading) {
        formElement = (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {formInputs}
                    <Button btnType="Success">{isSignup ? 'SIGNUP' : 'LOGIN'}</Button>
                </form>
                <Button btnType="Danger" onClick={switchSignup}>SWITCH TO {!isSignup ? 'SIGNUP' : 'LOGIN'}</Button>
            </div>);
    }

    if (props.isAuthenticated) {
        formElement = <Redirect to={props.authRedirectUrl} />
    }

    return formElement;
}

const mapDispatchToProps = dispatch => {
    return {
        submit: (email, password, isSignup) => dispatch(
            actions.auth(email, password, isSignup),
        ),
        onSetAuthRedirectPath: (url) => dispatch(actions.setAuthRedirectPath(url))

    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectUrl: state.auth.redirectPath,
        building: state.burgerBuilder.building
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
