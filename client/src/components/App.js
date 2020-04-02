import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import './App.css'

// import components
import NaviBar from './NaviBar.js'
import ShoppingContainer from '../containers/ShoppingContainer.js'
import CartContainer from '../containers/CartContainer.js'
import CheckoutContainer from '../containers/CheckoutContainer.js'
import CompletedContainer from '../containers/CompletedContainer.js'
// import CartSidebarContainer from '../containers/CartSidebarContainer.js'
import Footer from './Footer.js'

// import and instantiate socket
// import openSocket from 'socket.io-client'
// const clientSocket = openSocket('https://shop-n-pay.herokuapp.com/');

class App extends Component {

  // Flow: Shopping -> Cart -> Checkout -> Completed

  state = {
    initialRoute: '/shopping'
  }

  componentWillMount() {
    // Fetch initial data to see which mode to load app in

    // console.log("clientSocket:", clientSocket);

    // If checkout mode, then set initial route to /checkout-mode which renders a Checkout component with a filled shopping cart
    // clientSocket.on('checkAppMode', (data) => {
    //   console.log("CHECK APP MODE DATA:", data);  // should be "CHECKOUT" if route is '/api/checkout-mode'

    //   if (data === "CHECKOUT") {
    //     console.log("APP MODE IS CHECKOUT");
    //
    //     this.setState({ initialRoute: '/checkout' });
    //   }

    //   console.log("APP MODE IS NORMAL");

    // })

  }

  render() {
    
    // console.log("app props:", this.props);


    return (

      <Router>

        <div>

          <NaviBar />
          
          <div id="main-section">

            <Switch>

              <Route exact path="/shopping" component={ ShoppingContainer } />

              <Route exact path="/cart" component = { CartContainer } />

              <Route exact path="/checkout" component={ CheckoutContainer } />

              <Route exact path="/completed" component={ CompletedContainer } />

            </Switch>

            <Redirect to={ this.state.initialRoute } />
                        
          </div>


          <Footer />


        </div>

      </Router>


    );
  }

}

export default App;
