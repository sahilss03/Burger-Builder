import React, { Component } from 'react'
import Auxi from '../../hoc/Auxi'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
class Layout extends Component {
    state={
        showSideDrawer:false,
        isAuthenticated:this.props.Token!=null
    }
    SideDrawerCloseHandler=()=>
    {
        this.setState({
            showSideDrawer:false
        });
    }
    SideDrawerOpenHandler = () => {
        this.setState({
            showSideDrawer: true
        });
    }
    render() {
        
        return (
            <Auxi>
                <Toolbar 
                    SideDrawerOpenHandler={this.SideDrawerOpenHandler}
                    open={this.state.showSideDrawer}
                    isAuthenticated={this.props.Token!=null}
                    logoutHandler={this.props.logoutHandler}
                />
                <SideDrawer
                    closed={this.SideDrawerCloseHandler}
                    open={this.state.showSideDrawer}
                    isAuthenticated={this.props.Token!=null}
                    logoutHandler={this.props.logoutHandler}
                 />
                <div>Toolbar,SideDrawer,Backdrop</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxi>
        );
    }
}
export default Layout;