import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Auxi from '../../../hoc/Auxi'
import Backdrop from '../../UI/Backdrop/Backdrop'
const SideDrawer = (props) => {
    let attachedClasses=[classes.SideDrawer,classes.Close];
    if(props.open)
    {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Auxi>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="11%" marginbottom="32px" />
                <nav>
                    <NavigationItems 
                    isAuthenticated={props.isAuthenticated}
                    logoutHandler={props.logoutHandler}
                    />
                </nav>
            </div>
        </Auxi>
    );
}
export default SideDrawer;