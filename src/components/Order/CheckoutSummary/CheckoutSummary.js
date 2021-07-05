import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import Classes from './CheckoutSummary.css'
const CheckoutSummary = (props) => {
    return (
        <div className={Classes.CheckoutSummary}>
            <h1>WE HOPE IT TASTES GOOD!!</h1>
            <div style={{width:'100%',margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button clicked={props.CancelHandler} btnType="Danger">Cancel</Button>
            <Button clicked={props.ContinueHandler} btnType="Success">Continue</Button>
        </div>
    );
}
export default CheckoutSummary;