import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const buildControls = (props) => {

    const controlElements = controls.map((key, index) => {
        return <BuildControl
            label={key.label}
            key={key.label + index}
            addIngredientHandler={() => props.addIngredientHandler(key.type)}
            removeIngredientHandler={() => props.removeIngredientHandler(key.type)}
            disableRemove={props.disabledInfo[key.type]} />
    });

    return (
        <div className={classes.Control}>
            <p>Current Price: {props.price}</p>
            {controlElements}
            <button
                className={classes.OrderButton}
                disabled={!props.validBurger}
                onClick={props.purchaseHandler}>{!props.isAuthenticated ? 'SIGNIN TO PROCEED' : 'ORDER NOW'}</button>
        </div>
    );
}

export default buildControls;