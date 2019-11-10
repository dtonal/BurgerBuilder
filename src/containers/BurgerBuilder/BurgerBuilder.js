import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

import axiosOrder from '../../AxiosOrder';
export class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            purchased: false,
            purchasing: false
        }
    }

    componentDidMount = () => {
        this.props.onInitIngredients();
    }

    orderHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({
                purchasing: true
            })
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }


    checkValidBurger = (ingredients) => {
        return Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((acc, current) => acc + current)
            > 0;
    }

    backHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: "/checkout"
        });
    }


    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] < 1;
        }

        let modalContent = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded... :- (</p> : <Spinner />

        if (this.props.ings) {
            burger = (
                <>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        addIngredientHandler={this.props.onIngredientAdded}
                        removeIngredientHandler={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        price={this.props.price.toFixed(2)}
                        validBurger={this.checkValidBurger(this.props.ings)}
                        purchaseHandler={this.orderHandler}
                        isAuthenticated={this.props.isAuthenticated}
                    />
                </>
            );

            modalContent = (<OrderSummary
                ingredients={this.props.ings}
                backHandler={this.backHandler}
                continueHandler={this.purchaseHandler}
                price={this.props.price.toFixed(2)} />);

        }

        if (this.state.loading) {
            modalContent = <Spinner />
        }


        return (
            <>
                <Modal show={this.state.purchasing || this.state.loading} backHandler={this.backHandler}>
                    {modalContent}
                </Modal>
                {burger}

            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}
const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosOrder));