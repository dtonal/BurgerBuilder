import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';

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
      return (
        <>
            <Burger ingredients = {this.state.ingredients}/>
            <div>Controls</div>
        </>
      );
    }
  }
  
  export default BurgerBuilder;