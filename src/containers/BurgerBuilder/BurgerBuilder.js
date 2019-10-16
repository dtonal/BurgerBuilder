import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDINT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1,
    bacon: 0.4
}

class BurgerBuilder extends Component {
    constructor(props){
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            isValid: false,
            purchased: false,
            totalPrice: 3.00,
            purchasing: false
        }
    }

    purchaseHandler = () => {
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
          if( ingredients[ingredient] > 0) {
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


    render() {
        const disabledInfo={
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] < 1;
        }

      return (
        <>
            <Modal show={this.state.purchasing} backHandler={this.backHandler}>
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    backHandler={this.backHandler}
                    continueHandler={this.backHandler}
                    price={this.state.totalPrice.toFixed(2)}/>
            </Modal>
            <Burger ingredients = {this.state.ingredients}/>
            <BuildControls 
                addIngredientHandler={this.addIngredientHandler}
                removeIngredientHandler={this.removeIngredientHandler}
                disabledInfo={disabledInfo}
                price={this.state.totalPrice.toFixed(2)}
                validBurger={this.state.valid}
                purchaseHandler={this.purchaseHandler}
                />
        </>
      );
    }
  }
  
  export default BurgerBuilder;