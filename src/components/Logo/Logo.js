import React from 'react'
import pic from '../../assets/images/burger-logo.png'
import classes from './Logo.css'
const logo=(props)=>
{
    return(
        <div className={classes.Logo} style={{ height: props.height, marginBottom: props.marginbottom}}>
            <img src={pic} alt="MyBurger"></img>
        </div>
    );
}
export default logo;