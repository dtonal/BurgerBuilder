import React, { Component } from 'react';

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
            <div>Burger</div>
            <div>Controls</div>
        </>
      );
    }
  }
  
  export default BurgerBuilder;