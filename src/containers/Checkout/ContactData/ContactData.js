import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
class ContactData extends Component {
    state = {
        orderForm: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            pincode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'cheapest',
                valid: true,
            },
        },
        loading: false,
        formIsValid: false,
    }
    OrderHandler = (e) => {
        e.preventDefault();
        this.setState({
            loading: true,
        })
        let formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
        const obj = {
                ingredients: this.props.ingredients,
                price: this.props.TotalPrice,
                orderData: formData,
                userId: localStorage.getItem('userId')
            }
            // /.json is used only for firebase and /orders.json
            //will be appended to the baseURL that we have set.
            //also /orders will make an orders folder int the firebase
        axios.post('/orders.json?auth=' + this.props.Token, obj)
            .then(response => {
                console.log(response);
                this.setState({
                    loading: false,
                })
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({
                    loading: false,
                })
            });
    }
    checkValidity(value, rules) {
        if (!rules) {
            return true;
        }
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== '';
        }
        return isValid;
    }
    inputChangedHandler = (id, e) => {
        let UpdatedorderForm = {
            ...this.state.orderForm
        };
        let UpdatedorderFormElement = {
            ...this.state.orderForm[id]
        };
        UpdatedorderFormElement.value = e.target.value;
        UpdatedorderFormElement.valid = this.checkValidity(UpdatedorderFormElement.value, UpdatedorderFormElement.validation);
        UpdatedorderFormElement.touched = true;
        // console.log(UpdatedorderFormElement);
        UpdatedorderForm[id] = UpdatedorderFormElement;
        let formisValid = true;
        for (let key in UpdatedorderForm) {
            formisValid = UpdatedorderForm[key].valid && formisValid;
        }
        this.setState({
            orderForm: UpdatedorderForm,
            formIsValid: formisValid
        });

    }
    render() {
        const fromElementsArray = [];
        for (let key in this.state.orderForm) {
            fromElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }
        let form = ( <
            form onSubmit = { this.OrderHandler } > {
                fromElementsArray.map(obj => {
                    return <Input
                    key = { obj.id }
                    elementType = { obj.config.elementType }
                    elementConfig = { obj.config.elementConfig }
                    value = { obj.config.value }
                    Invalid = {!obj.config.valid }
                    shouldValidate = { obj.config.validation }
                    isTouched = { obj.config.touched }
                    change = { this.inputChangedHandler.bind(this, obj.id) }
                    />
                })
            } <
            Button disabled = {!this.state.formIsValid } > ORDER! < /Button> <
            /form>
        );
        if (this.state.loading) {
            form = < Spinner / >
        }
        return ( <
            div className = { classes.ContactData } >
            <
            h3 > Enter Your Contact Data < /h3> { form } <
            /div>
        );
    }
}
export default ContactData;