import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData'
class Checkout extends Component {
    state = {
        ingredients: null,
        TotalPrice: 0
    }
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                //['salad',1] this is it is stored right now
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({
            ingredients: ingredients,
            TotalPrice: price
        })
        if (this.props.ingredients) {
            this.setState({
                ingredients: this.props.ingredients,
                TotalPrice: this.props.TotalPrice
            })
        }
    }
    ContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    CancelHandler = () => {
        this.props.history.goBack();
    }
    render() {
            return ( <
                div >
                <
                CheckoutSummary ingredients = { this.state.ingredients }
                ContinueHandler = { this.ContinueHandler }
                CancelHandler = { this.CancelHandler }
                /> {
                    /* if we render the component like this to pass    the things in the current component  then
                                    for using all the props of Route eg history, i have to pass them like this */
                } <
                Route path = { this.props.match.path + '/contact-data' }
                render = {
                    (props) => ( < ContactData ingredients = { this.state.ingredients }
                        Token = { this.props.Token }
                        TotalPrice = { this.state.TotalPrice } {...props }
                        />)} / >
                        <
                        /div>
                    );
                }
            }
            export default Checkout;