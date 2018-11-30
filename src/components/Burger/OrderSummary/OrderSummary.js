import React from 'react';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
    .map(
        (ingredientType, index) => {
        return (
        <li key={ingredientType+index}>
            {props.ingredients[ingredientType]} times {ingredientType}
        </li>)
        });

    return(
    <>
        <h3>Your Order</h3>
        <p>Your burger has following ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p>Continue to Checkout?</p>
    </>
    );
}

export default orderSummary;