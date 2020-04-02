import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import './App.css'

// import components
import NaviBar from './NaviBar.js'
import RouterComponentContainer from '../containers/RouterComponentContainer.js'
import ShoppingContainer from '../containers/ShoppingContainer.js'
import CartContainer from '../containers/CartContainer.js'
import CheckoutContainer from '../containers/CheckoutContainer.js'
import CompletedContainer from '../containers/CompletedContainer.js'
// import CartSidebarContainer from '../containers/CartSidebarContainer.js'
import Footer from './Footer.js'

// import and instantiate socket
import openSocket from 'socket.io-client'
const clientSocket = openSocket('https://shop-n-pay.herokuapp.com/');

class App extends Component {

  // Flow: Shopping -> Cart -> Checkout -> Completed

  render() {

    return (

      <div>

        <RouterComponentContainer />

      </div>


    );
  }

}

export default App;
