import React from 'react';
import Button from '../../UI/Button/Button';
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
        <p>Continue to Checkout for <strong>{props.price}$</strong> ?</p>
        <Button onClick={props.backHandler} btnType='Danger'>CANCEL</Button>
        <Button onClick={props.continueHandler} btnType='Success'>CONTINUE</Button>
    </>
    );
}

export default orderSummary;