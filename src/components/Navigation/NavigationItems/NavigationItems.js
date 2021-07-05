import React from 'react'
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Button from '../../UI/Button/Button';
const NavigationItems=(props)=>
{
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact active >Burger Builder</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link="/orders" >Orders</NavigationItem> : null}
            {!props.isAuthenticated ? <NavigationItem link="/auth" >Authenticate</NavigationItem> : <Button clicked={props.logoutHandler}><NavigationItem link="/logout" >Logout</NavigationItem></Button>}
        </ul>
    );

}
export default NavigationItems;