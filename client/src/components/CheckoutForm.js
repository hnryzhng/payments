import React, { Component } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios';

// import stylesheets
import './CheckoutForm.css';
// import 'bootstrap/dist/css/bootstrap.min.css';	// React Bootstrap for Modal and Button components

// import Stripe libraries
import { Elements, ElementsConsumer, CardElement } from  '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// import components
// import CreditCardSection from './CreditCardSection.js';
import CARD_ELEMENT_OPTIONS from './cardElementOptions.js';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// import mock data
import generatedUsersList from '../mock-data/generatedUsersList.js';

// create Stripe object using public API key
const stripePromise = loadStripe("pk_test_1qkmfzDbvepMuYaOYk6hsILu00dq30DuN7");

class CheckoutForm extends Component {

	state = {
		name: "",
		email: "",
		address: "",
		city: "",
		state: "",
		zip: "",
		country: "United States",
		cardName: "",
		clientSecret: "",
		publishableKey: "",
		totalCostDisplay: 0,
		mockUserIndex: 0,
		shippingAddressLoading: false,
		creditSectionLoading: false,
		reviewSectionLoading: false,
		shippingAddressCompleted: false,
		creditSectionCompleted: false,
		reviewSectionCompleted: false,
		paymentConfirmed: false,
		showModal: false,
		modalMessage: null
	}

	generateUserInfo = () => {

		// console.log("generatedUsersList:", generatedUsersList);

		// console.log("click on generateUserInfo");

		// generate random index 
		var userIndex = 0;
		while (userIndex === this.state.mockUserIndex) {
			userIndex = Math.floor(Math.random() * Math.floor(generatedUsersList.length));
		}
		this.setState({ mockUserIndex: userIndex });
		// console.log("user index:", userIndex);

		// pick fake user based on generated sindex
		const mockUserObj = generatedUsersList[userIndex];
 		// console.log("mockUserObj:", mockUserObj);

		// fill in user info in form fields
		this.setState({ name: mockUserObj.name });
		this.setState({ email: mockUserObj.email });
		this.setState({ address: mockUserObj.address });
		this.setState({ city: mockUserObj.city });
		this.setState({ state: mockUserObj.state });
		this.setState({ zip: mockUserObj.zip });

		// console.log("current state:", this.state);
	}

	validateShippingFields = () => {

		// if any user shipping address fields are empty
		if (this.state.name.length !== 0 && this.state.email.length !== 0 && this.state.address.length !== 0 && this.state.city.length !== 0 && this.state.state.length !== 0 && this.state.zip.length !== 0) {
			return true;
		}

		// if all fields are filled
		return false;
	}

	submitUserShipping = (event) => {
		event.preventDefault();

		// console.log("submit user shipping address");

		// Dispatch action to store customer info in global store
		const obj = {
			name: this.state.name,
			email: this.state.email,
			address: this.state.address,
			city: this.state.city,
			state: this.state.state,
			zip: this.state.zip,
			country: this.state.country
		}

		this.props.addCustomerInfo(obj);

		// Set section completed to true
		this.setState({ shippingAddressCompleted: true });

	}

	submitPaymentData = async (event) => {
		event.preventDefault();

		// console.log("submit payment data: credit card");

		this.setState({ creditSectionLoading: true });

		// assign API objects
		const { stripe, elements } = this.props;
		
		// console.log("card element object:", elements.getElement(CardElement));

		if (!stripe || !elements) {
			// Then Stripe.js has not loaded
			// Set loading state and show button loading animation
			this.setState({ creditSectionLoading: true });
		}

		// set base url depending on environment
		const production = "https://shop-n-pay.herokuapp.com";
		const development = "http://localhost:3000";
		const baseURL = (process.env.NODE_ENV? production: development);

		// form values to be sent
		const { name, email, address, city, state, zip, country, cardName } = this.state;
		// TASK: add selected items along with quantities from Shopping cart for total cost to be calc on backend
		const reqObj = {
			name: name,
			email: email,
			address: address,
			state: state,
			zip: zip,
			country: country,
			cardName: cardName,
			shoppingCartItemsArray: this.props.shoppingCart
		}

		// send form values to create PaymentIntent 
		axios.post(`${baseURL}/api/create-payment-intent`, reqObj)
				.then(response => response.data)
				.then(data => {
					console.log("response data: ", data);
					// if PI successfully created, proceed with confirm card payment
					if ( data.success ) {

						// Set states for returned payment tokens and completion of section
						// TASK: make sure client secret is exposed only to the customer, who is preferably logged in
						// how do I know client secret corresponds to logged in customer? Customer token?
						this.setState({ clientSecret: data.clientSecret});
						this.setState({ publishableKey: data.publishableKey });
					
						// TASK: Set state for total cost calculated from server side 
						this.setState({ totalCostDisplay: data.totalCost });

						// Set state of section completed to true
						this.setState({ creditSectionCompleted: true });
						this.setState({ creditSectionLoading: false })

						// Dispatch action to add tokens to paymentData state in global store
						const obj = {
							clientSecret: data.clientSecret,
							publishableKey: data.publishableKey
						}
						this.props.addPaymentTokens(obj);

					} else {
						// TASK: if PI wasn't successfully created, show error message
						// alert("Your payment information could not be processed. Please try again.")
						// show error message in modal
						const errorMessage = "Your payment information could not be processed. Please try again.";						
						this.setState({ modalMessage: errorMessage }, () => {
							this.setState({ showModal: true });
						});

					}
				})
				.catch( err => console.log("error:", err));
	}

	submitOrder = async () => {

		// Set section loading to true for button animation
		this.setState({ reviewSectionLoading: true });

		const { stripe, elements } = this.props;

		const confirmationResponse = await stripe.confirmCardPayment(this.state.clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),	// grab CardElement children component 
				// billing_details: {
					// name: this.state.cardName
				// }
			}
		});

		if (confirmationResponse.error) {
			// show error message
			console.log("confirmation error object:", confirmationResponse.error);
			console.log("confirmation error message:", confirmationResponse.error.message);
			// alert(confirmationResponse.error.message);

			// show error message in modal
			const errorMessage = confirmationResponse.error.message;
			this.setState({ modalMessage: errorMessage }, () => {
				this.setState({ showModal: true });
			});	

			// TASK: 
			// if error.type === "invalid_request_error" refresh page while keeping items from shopping cart

		} else {
			if (confirmationResponse.paymentIntent.status === "succeeded") {
				// Payment has been completed
				
				// console.log("conf response:", confirmationResponse.paymentIntent);

				// alert("Your order has been placed!");

				// Clear shopping cart with action dispatch
				this.props.clearCart();

				// Set section's loading to false to deactivate button loading animation
				this.setState({ reviewSectionLoading: false });

				// Set completion of Checkout page in global store with action dispatch
				this.props.finishCheckout();



			} else {
				// TASK: still waiting for success signal, keep loading animation for x seconds
			}			
		}

	}

	render(){

		const { name, address, city, state, zip, totalCostDisplay } = this.state;

		// console.log("CheckoutForm PROPS:", this.props);

		// loading components
		let showLoading;
		if (this.state.reviewSectionLoading) {
			showLoading = (<button className="btn btn-block btn-primary checkout-button" style={{ display: this.state.reviewSectionLoading? "block" : "none" }} disabled>
				<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
					Loading...
				</button>)
		} else {
			showLoading = null;
		}

		return(
			<div id="checkout-container">

				<section id="user-shipping-section" className="checkout-section">

					<h4>1. Shipping Address</h4>
					
					<div id="shipping-fields" className="checkout-block container-fluid" style={{ display: this.state.shippingAddressCompleted? 'none' : 'block' }} >
					
						<div className="row">
							<p><a href="#" id="generate-user-info-link" onClick={ this.generateUserInfo }>Generate</a> user information below</p>
						</div>

						<div className="row">
							<label for="name">
								<span>Name</span>
								<input type="text" className="input-field" id="name" name="name" value={ this.state.name } onChange={ event => this.setState({ name: event.target.value })} placeholder="Atticus Finch"/>
							</label>
						</div>
						
						<div className="row">
							<label for="email">
								<span>Email</span>
								<input type="text" className="input-field" id="email" name="email" value={ this.state.email } onChange={ event => this.setState({ email: event.target.value })} placeholder="honorablelawyer60@email.com"/>
							</label>		
						</div>

						<div className="row">
							<label for="address">
								<span>Address</span>
								<input type="text" className="input-field" id="address" name="address" value={ this.state.address } onChange={ event => this.setState({ address: event.target.value })} placeholder="6890 Justice Avenue"/>
							</label>
						</div>

						<div className="row">
							<label for="city">
								<span>City</span>
								<input type="text" className="input-field" id="city" name="city" value={ this.state.city } onChange={ event => this.setState({ city: event.target.value })} placeholder="Maycomb"/>
							</label>
						</div>
						
						<div className="row">
							<label for="state">
								<span>State</span>
								<input type="text" className="input-field" id="state" name="state" value={ this.state.state } onChange={ event => this.setState({ state: event.target.value })} placeholder="Alabama"/>
							</label>
						</div>

						<div className="row">
							<label for="zip">
								<span>ZIP</span>
								<input type="text" className="input-field" id="zip" name="zip" value={ this.state.zip } onChange={ event => this.setState({ zip: event.target.value })} placeholder="36460"/>
							</label>
						</div>

						<div className="row">
							<label for="country">
								<span id="country-label">Country</span>
								<select id="country" onChange={ event => this.setState({ country: event.target.value })}>  
									<option value="">United States</option>
								</select>
							</label>
						</div>

						<button id="shipping-button" className="btn btn-block btn-primary checkout-button" disabled={ !this.validateShippingFields() } onClick={ this.submitUserShipping }>Save + Continue</button>

					</div>


					<div id="submitted-shipping-info" className="checkout-block" style={{ display: !this.state.shippingAddressCompleted? 'none' : 'block' }}>
						<p>Name: { name }</p>
						<p>Address: {address}, {city}, {state} {zip}</p>
					</div>

				</section>


				<section id="credit-card-section" className="checkout-section">

					<h4 style={{ color: this.state.shippingAddressCompleted? "#000": "#c4c4c4" }}>2. Credit Card Information</h4>

					<div id="credit-card-fields" className="container checkout-block"  style={{ display: !this.state.shippingAddressCompleted? 'none' : 'block' }}>

						<p id="credit-card-demo-message">Demo version: To proceed, type in "4242 4242 4242 4242" for card number and any value for the expiration date and CVC code.</p>

						<CardElement options={ CARD_ELEMENT_OPTIONS } />
						
						<hr />

						<div >
							<button className="btn btn-block btn-primary checkout-button" style={{ display: this.state.creditSectionLoading? "none" : "block" }} onClick={ this.submitPaymentData } disabled={ this.state.creditSectionCompleted } >
								Save Credit Card
							</button>
							
							<button className="btn btn-block btn-primary checkout-button" style={{ display: this.state.creditSectionLoading? "block" : "none" }} disabled>
								<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
								Loading...
							</button>

						</div>
					</div>

				</section>

				<section id="review-section" className="checkout-section">

					<h4 style={{ color: this.state.creditSectionCompleted? "#000": "#c4c4c4" }}>3. Review Your Order</h4>

					<div id="review-order" className="checkout-block" style={{ display: !this.state.creditSectionCompleted? 'none': 'block' }}>
						<p>{ name }</p>
						<p>{address}</p>
						<p>{city}, {state} {zip}</p>

						<hr />

						<p id="review-total-cost">Total Cost: {totalCostDisplay}</p>
						<p id="review-shipping">Shipping: 1-day delivery</p>
					
						<button className="btn btn-block btn-primary checkout-button" onClick={ this.submitOrder } style={{ display: this.state.reviewSectionLoading? "none" : "block" }} >
							Complete Your Order
						</button>						

						<button className="btn btn-block btn-primary checkout-button" style={{ display: this.state.reviewSectionLoading? "block" : "none" }} disabled>
							<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
							Loading...
						</button>
					
					</div>

				</section>

				<MessageModal showModal={ this.state.showModal } modalMessage={ this.state.modalMessage }/>

			</div>
		);
	};
}

class MessageModal extends Component {
  state = {
    showModal: true
  }

  componentWillMount() {
  	// set initial state based on prop from parent CheckoutForm component
  	this.setState({ showModal: this.props.showModal });
  }

  componentDidUpdate(prevProps, prevState) {
  	if (prevProps !== this.props) {
		this.setState({ showModal: this.props.showModal });	
  	}
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  render(){
    return(

      <Modal id="demo-modal" show={ this.state.showModal } onHide={ this.closeModal } animation={ false } centered>
        
        <Modal.Header closeButton>
          <h3>Error</h3>
        </Modal.Header>

        <Modal.Body>
        	<p>{ this.props.modalMessage }</p>
        </Modal.Body>

        <Button id="demo-modal-close-button" variant="primary" onClick={ this.closeModal } >
          Got it!
        </Button>

      </Modal>
    )
  }

}

class CheckoutFormAPIWrapper extends Component {
	render(){
		return(
			<Elements stripe={ stripePromise } >
				<ElementsConsumer>

					{({stripe, elements}) => (
						<CheckoutForm stripe={ stripe } elements={ elements } { ...this.props } />
					)}

				</ElementsConsumer>
			</Elements>
		);
	}
}

CheckoutForm.propTypes = {
	shoppingCart: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			quantity: PropTypes.number.isRequired
		})
	).isRequired,
	customerInfo: PropTypes.shape({
		name: PropTypes.string,
		email: PropTypes.string,
		shipping: PropTypes.shape({
			address: PropTypes.string, 
			state: PropTypes.string,
			zip: PropTypes.string,
			country: PropTypes.string
		})
	}),
	paymentTokens: PropTypes.shape({
		clientSecret: PropTypes.string,
		publishableKey: PropTypes.string
	}).isRequired
}

export default CheckoutFormAPIWrapper;