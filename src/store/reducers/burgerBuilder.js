import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDINT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1,
    bacon: 0.4
}

const initState = {
    ingredients: null,
    totalPrice: 3.00,
    error: false,
    building: false
}

const addIngredient = (state, action) => {
    const updatedIngredient =
    {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDINT_PRICES[action.ingredientName],
        building: true
    })
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 3,
        error: false,
        building: false
    });
}


const removeIngredient = (state, action) => {
    const updatedIngredient =
    {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
    }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDINT_PRICES[action.ingredientName],
        building: true
    })
}

const initIngredientsFail = (state, action) => {
    return updateObject(state, {
        error: true
    })
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS: return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENTS: return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionTypes.INIT_INGREDIENTS_FAILED: return initIngredientsFail(state, action)
        default: return state
    }
}

export default reducer;