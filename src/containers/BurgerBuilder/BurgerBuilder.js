import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
            totalPrice: 0.00
        }
    }

    render() {
      const addIngredientHandler = (ingredient) => {
          var ingredients = this.state.ingredients;
          ingredients[ingredient]++;
          this.setState({
              ingredients: ingredients
          });
      };

      const removeIngredientHandler = (ingredient) => {
          var ingredients = this.state.ingredients;
          if( ingredients[ingredient] > 0) {
            ingredients[ingredient]--;
          }
          this.setState({
              ingredients: ingredients
          });
      };

      return (
        <>
            <Burger ingredients = {this.state.ingredients}/>
            <BuildControls 
                addIngredientHandler={addIngredientHandler}
                removeIngredientHandler={removeIngredientHandler}
                />
        </>
      );
    }
  }
  
  export default BurgerBuilder;