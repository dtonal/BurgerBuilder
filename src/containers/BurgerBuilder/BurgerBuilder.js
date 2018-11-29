import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
            purchased: false,
            totalPrice: 3.00
        }
    }

      getPriceForIngredient = (ingredientType) => {
        return INGREDINT_PRICES[ingredientType];
      }


      addIngredientHandler = (ingredient) => {
          const ingredients = this.state.ingredients;
          const newPrice = this.state.totalPrice + this.getPriceForIngredient(ingredient);
          ingredients[ingredient]++;
          this.setState({
              ingredients: ingredients,
              totalPrice: newPrice
          });
      };

      removeIngredientHandler = (ingredient) => {
          var ingredients = this.state.ingredients;
          if( ingredients[ingredient] > 0) {
            ingredients[ingredient]--;
            const newPrice = this.state.totalPrice - this.getPriceForIngredient(ingredient);
            this.setState({
                ingredients: ingredients,
                totalPrice: newPrice
            });
          }
      };


    render() {
        const disabledInfo={
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] < 1;
        }

      return (
        <>
            <Burger ingredients = {this.state.ingredients}/>
            <BuildControls 
                addIngredientHandler={this.addIngredientHandler}
                removeIngredientHandler={this.removeIngredientHandler}
                disabledInfo={disabledInfo}
                price={this.state.totalPrice.toFixed(2)}
                />
        </>
      );
    }
  }
  
  export default BurgerBuilder;