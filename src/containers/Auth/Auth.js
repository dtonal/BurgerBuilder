import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';


class Auth extends Component {
    state = {
        controls: {
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
        },
        isSignup: true
    }

    componentDidMount() {
        if (!this.props.building) {
            this.props.onSetAuthRedirectPath("/");
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidty(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({
            controls: updatedControls
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
        console.log("valid: " + valid);
        return valid;
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.submit(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switchSignup = () => {
        this.setState({
            isSignup: !this.state.isSignup
        })
    }

    render() {
        const formElements = [];

        for (let key in this.state.controls) {
            formElements.push(
                {
                    id: key,
                    config: this.state.controls[key]
                });
        }

        const formInputs = formElements.map(el => (
            <Input
                key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                changed={(event) => this.inputChangedHandler(event, el.id)}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                touched={el.config.touched} />
        ))

        let formElement = <Spinner />
        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (<p>{this.props.error.message}</p>);
        }

        if (!this.props.loading) {
            formElement = (
                <div className={classes.Auth}>
                    {errorMessage}
                    <form onSubmit={this.submitHandler}>
                        {formInputs}
                        <Button btnType="Success">{this.state.isSignup ? 'SIGNUP' : 'SUBMIT'}</Button>
                    </form>
                    <Button btnType="Danger" onClick={this.switchSignup}>SWITCH TO {!this.state.isSignup ? 'SIGNUP' : 'SUBMIT'}</Button>
                </div>);
        }

        if (this.props.isAuthenticated) {
            formElement = <Redirect to={this.props.authRedirectUrl} />
        }

        return formElement;
    }
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
