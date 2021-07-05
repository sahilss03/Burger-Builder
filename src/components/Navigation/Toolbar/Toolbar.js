import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar} >
            <div className={classes.newclass} onClick={props.SideDrawerOpenHandler}>
                <div className={classes.DrawerToggle} ></div>
                <div className={classes.DrawerToggle} ></div>
                <div className={classes.DrawerToggle} ></div>
            </div>

            <Logo />
            <nav className={classes.DekstopOnly}>
                <NavigationItems
                    isAuthenticated={props.isAuthenticated}
                    logoutHandler={props.logoutHandler}
                 />
            </nav>
        </header>
    );

}
export default toolbar;