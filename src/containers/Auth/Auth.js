import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css'
import axios from 'axios'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom';
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Id',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true,
        loading: false,
        errorMessage: '',
        isError: false,
    }
    checkValidity(value, rules) {
        if (!rules) {
            return true;
        }
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== '';
        }
        if (rules.isEmail) {
            //    const pattern=/[a-z0-9!#$%&'*+/=?^_`{|}~-]/
        }
        if (value.length < rules.minLength) {
            isValid = false
        }
        return isValid;
    }
    inputChangedHandler = (id, e) => {
        let UpdatedControls = {
            ...this.state.controls,
            [id]: {
                ...this.state.controls[id],
                value: e.target.value,
                valid: this.checkValidity(e.target.value, this.state.controls[id].validation),
                touched: true
            }
        };
        this.setState({
            controls: UpdatedControls
        });

    }
    submitHandler = (e) => {
        e.preventDefault();
        let password = this.state.controls.password.value;
        let email = this.state.controls.email.value;
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA0K70Xb - COVNPkuqwjjsxOVdx0tqneTLI';
        if (!this.state.isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA0K70Xb - COVNPkuqwjjsxOVdx0tqneTLI';
        }
        this.setState({
            loading: true
        })
        axios.post(url, authData)
            .then(response => {
                // console.log(response);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                let Token = localStorage.getItem('token');
                this.props.getToken(Token, this.state.isSignup);
                this.setState({
                    loading: false,
                    isError: false,
                    errorMessage: 'Enter Again!',
                })
            })
            .catch(err => {
                // let arr=[]
                // arr.push(err.response.data.error);
                // this.setState({
                //     errorMessage: arr[0].message
                // })
                this.setState({
                    loading: false,
                    isError: true
                })
            })
    }
    switchAuthModeHandler = () => {
        this.setState({
            isSignup: !this.state.isSignup,
        });
    }
    render() {
        let isAuth = null;
        if (this.props.isAuthenticated) {
            isAuth = this.props.building ? < Redirect to = {
                {
                    pathname: '/checkout',
                    state: { ingredients: this.props.ingredients, flag: 1 }
                }
            }
            /> :<Redirect to='/
            '/>
        }
        const fromElementsArray = [];
        for (let key in this.state.controls) {
            fromElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }
        let form = fromElementsArray.map(obj => {
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
        if (this.state.loading) {
            form = < Spinner / >
        }
        let errMessage = null;
        if (this.state.isError) {
            errMessage = this.state.errorMessage;
        }
        return ( <
            div className = { classes.Auth } > { errMessage } { isAuth } <
            form onSubmit = { this.submitHandler } > { form } <
            Button btnType = "Success" > Submit < /Button> <
            /form> <
            Button btnType = "Danger"
            clicked = { this.switchAuthModeHandler } > Switch to { this.state.isSignup ? "SIGNIN" : "SIGNUP" } < /Button> <
            /div>
        );
    }
}
export default Auth;