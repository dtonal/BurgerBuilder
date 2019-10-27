import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosOrder from '../../AxiosOrder';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDINT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1,
    bacon: 0.4
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            isValid: false,
            purchased: false,
            totalPrice: 3.00,
            purchasing: false,
            loading: false,
            error: false
        }
    }

    componentDidMount = () => {
        axiosOrder.get("/ingredients.json").then(response => {
            this.setState({ ingredients: response.data });
        }).catch(error => {
            this.setState({error: true});
        })
    }

    orderHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    getPriceForIngredient = (ingredientType) => {
        return INGREDINT_PRICES[ingredientType];
    }

    checkValidBurger = (ingredients) => {
        return Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((acc, current) => acc + current)
            > 0;
    }


    addIngredientHandler = (ingredient) => {
        const ingredients = this.state.ingredients;
        const newPrice = this.state.totalPrice + this.getPriceForIngredient(ingredient);
        ingredients[ingredient]++;
        const isValid = this.checkValidBurger(ingredients);
        this.setState({
            ingredients: ingredients,
            totalPrice: newPrice,
            valid: isValid
        });
    };

    removeIngredientHandler = (ingredient) => {
        var ingredients = this.state.ingredients;
        if (ingredients[ingredient] > 0) {
            ingredients[ingredient]--;
            const newPrice = this.state.totalPrice - this.getPriceForIngredient(ingredient);
            const isValid = this.checkValidBurger(ingredients);
            this.setState({
                ingredients: ingredients,
                totalPrice: newPrice,
                valid: isValid
            });
        }
    };

    backHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseHandler = () => {
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+"="+this.state.ingredients[i])
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryParamsString = queryParams.join("&");
        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryParamsString
        });
    }


    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] < 1;
        }

        let modalContent = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded... :- (</p>:<Spinner />

        if (this.state.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        addIngredientHandler={this.addIngredientHandler}
                        removeIngredientHandler={this.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        price={this.state.totalPrice.toFixed(2)}
                        validBurger={this.state.valid}
                        purchaseHandler={this.orderHandler}
                    />
                </>
            );

            modalContent = (<OrderSummary
                ingredients={this.state.ingredients}
                backHandler={this.backHandler}
                continueHandler={this.purchaseHandler}
                price={this.state.totalPrice.toFixed(2)} />);
    
        }

        if(this.state.loading){
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

export default withErrorHandler(BurgerBuilder, axiosOrder);