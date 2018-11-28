import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    constructor(props){
        super(props);
        this.state = {
            ingredients: [],
            purchased: false,
            totalPrice: 0.00
        }
    }


    render() {
      return (
        <>
            <Burger/>
            <div>Controls</div>
        </>
      );
    }
  }
  
  export default BurgerBuilder;