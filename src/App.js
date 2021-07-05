import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'
import { Route, Switch  } from 'react-router-dom'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Logout/Logout'
//let TKN=null;
class App extends Component {
  state={
    TKN:localStorage.getItem('token'),
    building:false,
    ingredients: null,
    TotalPrice:0,
  }
  getToken = (tkn,isSignup) => {
    // console.log(tkn);
    if(!isSignup)
    {
      this.setState({
        TKN: tkn
      })
    }
  }
  BuildHandler=()=>
  {
    this.setState({
      building:true,
    })
  }
  logoutHandler=()=>
  {
    this.setState({
      TKN:null
    });
  }
  getIngredients=(ing,price)=>
  {
    this.setState({
      ingredients:ing,
      TotalPrice:price,
    })
  }
  notBuildHandler=()=>
  {
    this.setState({
      building:false
    })
  }
  render() {
    // console.log(this.state.TKN);
    return (
      <div>
        <Layout Token={this.state.TKN} logoutHandler={this.logoutHandler}>
          <Switch>
            <Route path='/checkout' render={(props) => (<Checkout {...props} TotalPrice={this.state.TotalPrice} ingredients={this.state.ingredients} Token={this.state.TKN}/>)} />

            <Route path='/orders'  exact render={(props)=>(<Orders {...props} Token={this.state.TKN}/>)} />

            <Route path='/auth' exact render={(props) => (<Auth {...props} ingredients={this.state.ingredients} building={this.state.building} getToken={this.getToken.bind(this)} isAuthenticated={this.state.TKN != null}/>)} />

            <Route path='/logout' exact component={Logout} />

            <Route path='/' exact render={(props) => (<BurgerBuilder {...props} getIngredients={this.getIngredients.bind(this)} notBuildHandler={this.notBuildHandler} BuildHandler={this.BuildHandler} isAuthenticated={this.state.TKN != null}/>)} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
