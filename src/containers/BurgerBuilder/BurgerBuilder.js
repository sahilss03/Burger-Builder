import React, { Component } from 'react'
import Auxi from '../../hoc/Auxi'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
}
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        TotalPrice: 4,
        Orderable: false,
        purchasing: false,
        loading: false,
        building: false,
    }
    UpdateOrderable = (ingredients) => {
        let sum = 0;
        for (let key in ingredients) {
            sum = sum + ingredients[key];
        }
        this.setState({
            Orderable: sum > 0
        })
    }
    Addingredient = (type) => {
        let oldval = this.state.ingredients[type];
        let newval = oldval + 1;
        let newingredients = {
            ...this.state.ingredients
        }
        newingredients[type] = newval;
        let oldprice = this.state.TotalPrice;
        let newprice = oldprice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: newingredients,
            TotalPrice: newprice,
            building: true,
        })
        this.props.BuildHandler();
        this.UpdateOrderable(newingredients);
    }
    Removeingredient = (type) => {
        let oldval = this.state.ingredients[type];
        if (oldval <= 0) {
            return true;
        }
        let newval = oldval - 1;
        let newingredients = {
            ...this.state.ingredients
        }
        newingredients[type] = newval;
        let oldprice = this.state.TotalPrice;
        let newprice = oldprice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients: newingredients,
            TotalPrice: newprice,
            building: true,
        })
        this.props.BuildHandler();
        this.UpdateOrderable(newingredients);
        return false;
    }
    PurchasHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({
                purchasing: true,
                loading: false,
                building: false,
            })
        } else {
            this.props.getIngredients(this.state.ingredients, this.state.TotalPrice);
            this.props.history.push('/auth');
        }

    }
    ClickHandler = () => {
        this.setState({
            purchasing: false
        })
    }
    componentDidMount() {
        this.setState({
            building: false
        })
        this.props.notBuildHandler();
    }
    Checkout = () => {
        const queryparams = [];
        //encodeURIComponent will encode the data
        //in the url form
        queryparams.push('price=' + this.state.TotalPrice);
        for (let i in this.state.ingredients) {
            queryparams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const querystring = queryparams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + querystring
        })

    }
    render() {
        const disabledinfo = {
            ...this.state.ingredients
        };
        for (let key in disabledinfo) {
            disabledinfo[key] = disabledinfo[key] <= 0;
        }
        let orderSummary = < OrderSummary
        ingredients = { this.state.ingredients }
        checkout = { this.Checkout }
        getback = { this.ClickHandler }
        price = { this.state.TotalPrice }
        />
        if (this.state.loading) {
            orderSummary = < Spinner / >
        }
        return ( < Auxi >
            <
            Modal show = { this.state.purchasing }
            ClickHandler = { this.ClickHandler } > { orderSummary } < /Modal> <
            Burger ingredients = { this.state.ingredients }
            />  <
            BuildControls Add = { this.Addingredient }
            Remove = { this.Removeingredient }
            disabledinfo = { disabledinfo }
            Price = { this.state.TotalPrice }
            Orderable = { this.state.Orderable }
            ordered = { this.PurchasHandler }
            isAuth = { this.props.isAuthenticated }
            />

            <
            /Auxi>
        );
    }
};
export default BurgerBuilder;