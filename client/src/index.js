import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import AppTest from './components/AppTest';

import { Provider } from 'react-redux';	// Provider allows for access to store in any component
import { createStore } from 'redux'; 
import rootReducer from './reducers/index.js';

import mockItemsList from './mock-data/mockItemsList.js';

// load partial initial state based on particular key into store from mock data
const initialStateObj = {
	appMode: 'FULL',
	itemsList: mockItemsList,
	shoppingCart: [],
	customerInfo: {},
	paymentTokens: {},
	continueShopping: false,
	finishedShopping: false,
	finishedCart: false,
	finishedCheckout: false
}

const store = createStore(rootReducer, initialStateObj);	// creates store with root reducer containing global state tree
console.log("initial store:", store.getState());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root')
);

