import * as actionTypes from './actionTypes';
import axiosOrder from '../../AxiosOrder';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: ingName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const initIngredientsFailed = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return (dispatch) => {
        axiosOrder.get("/ingredients.json").then(response => {
            dispatch(setIngredients(response.data))
        }).catch(error => {
            dispatch(initIngredientsFailed())
        })
    };
}