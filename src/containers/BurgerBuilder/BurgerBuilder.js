import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

import axiosOrder from '../../AxiosOrder';

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    useEffect(
        () => props.onInitIngredients(),
        [props.onInitIngredients]
    );

    const orderHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }


    const checkValidBurger = (ingredients) => {
        return Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((acc, current) => acc + current)
            > 0;
    }

    const backHandler = () => {
        setPurchasing(false);
    }

    const purchaseHandler = () => {
        props.onInitPurchase();
        props.history.push({
            pathname: "/checkout"
        });
    }

    const disabledInfo = {
        ...props.ings
    }
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] < 1;
    }

    let modalContent = null;

    let burger = props.error ? <p>Ingredients can't be loaded... :- (</p> : <Spinner />

    if (props.ings) {
        burger = (
            <>
                <Burger ingredients={props.ings} />
                <BuildControls
                    addIngredientHandler={props.onIngredientAdded}
                    removeIngredientHandler={props.onIngredientRemoved}
                    disabledInfo={disabledInfo}
                    price={props.price.toFixed(2)}
                    validBurger={checkValidBurger(props.ings)}
                    purchaseHandler={orderHandler}
                    isAuthenticated={props.isAuthenticated}
                />
            </>
        );

        modalContent = (<OrderSummary
            ingredients={props.ings}
            backHandler={backHandler}
            continueHandler={purchaseHandler}
            price={props.price.toFixed(2)} />);

    }

    if (props.loading) {
        modalContent = <Spinner />
    }

    return (
        <>
            <Modal show={purchasing || props.loading} backHandler={backHandler}>
                {modalContent}
            </Modal>
            {burger}
        </>
    );
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