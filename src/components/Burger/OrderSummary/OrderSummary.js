import React from 'react'
import Auxi from '../../../hoc/Auxi'
import Button from '../../UI/Button/Button'
const OrderSummary=(props)=>
{
    const ingredientsummary=Object.keys(props.ingredients).map(igkey=>{
        return <li key={igkey}><span style={{textTransform:'capitalize'}}>{igkey}</span> : {props.ingredients[igkey]}</li>
    })
    
    return(
       <Auxi>
           <h3>Your Order :</h3>
           <p>The delecious burger with the following ingredients</p>
           {ingredientsummary}
           <p>Continue to checkout</p>
           <p><strong>TOTAL PRICE : {props.price.toFixed(2)}</strong></p>
           <Button clicked={props.checkout} btnType="Success">Continue</Button>
           <Button clicked={props.getback} btnType="Danger">Cancel</Button>
       </Auxi>
    );
}
export default OrderSummary;