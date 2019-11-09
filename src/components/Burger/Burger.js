import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])]
                .map(
                    (_, index) =>
                        <BurgerIngredient key={ingKey + index} type={ingKey} />
                )
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, [])

    const messageElement = transformedIngredients.length > 0 ? null : <div>Please add ingredients</div>;

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            {messageElement}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;