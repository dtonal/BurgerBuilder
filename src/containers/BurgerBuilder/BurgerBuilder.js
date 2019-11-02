import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosOrder from '../../AxiosOrder';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchased: false,
            purchasing: false,
            loading: false,
            error: false
        }
    }

    componentDidMount = () => {
        // axiosOrder.get("/ingredients.json").then(response => {
        //     this.setState({ ingredients: response.data });
        // }).catch(error => {
        //     this.setState({error: true});
        // })
    }

    orderHandler = () => {
        this.setState({
            purchasing: true
        })
    }


    checkValidBurger = (ingredients) => {
        return Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((acc, current) => acc + current)
            > 0;
    }

    backHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseHandler = () => {
        this.props.history.push({
            pathname: "/checkout"
        });
    }


    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] < 1;
        }

        let modalContent = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded... :- (</p> : <Spinner />

        if (this.props.ings) {
            burger = (
                <>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        addIngredientHandler={this.props.onIngredientAdded}
                        removeIngredientHandler={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        price={this.props.price.toFixed(2)}
                        validBurger={this.checkValidBurger(this.props.ings)}
                        purchaseHandler={this.orderHandler}
                    />
                </>
            );

            modalContent = (<OrderSummary
                ingredients={this.props.ings}
                backHandler={this.backHandler}
                continueHandler={this.purchaseHandler}
                price={this.props.price.toFixed(2)} />);

        }

        if (this.state.loading) {
            modalContent = <Spinner />
        }


        return (
            <>
                <Modal show={this.state.purchasing || this.state.loading} backHandler={this.backHandler}>
                    {modalContent}
                </Modal>
                {burger}

            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(
            {
                type: actionTypes.ADD_INGREDIENTS,
                ingredientName: ingName
            }
        ),
        onIngredientRemoved: (ingName) => dispatch(
            {
                type: actionTypes.REMOVE_INGREDIENTS,
                ingredientName: ingName
            }
        )
    }
}
const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosOrder));