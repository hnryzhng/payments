import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

// import components
import CheckoutFormWrapper from './CheckoutForm.js'
import CheckoutSidebar from './CheckoutSidebar.js'

class Checkout extends Component {

	// Display if this.props.submittedShopping is true from Shopping component

	// Submit props shopping cart list and customer data from container to CheckoutForm

	state = {
		sCart: []
	}

	componentWillMount() {
		// If app mode is Checkout, then load shopping cart with three items from items list
		// console.log('this props appMode:', this.props.appMode);
		if (this.props.appMode === 'CHECKOUT') {
			var initialList = [...this.props.itemsList];

			// Create list of items to be displayed with quantity of 1 per item 

			var filteredList = initialList.filter( item => item.display );

			const newList = filteredList.map((item, index) => {
				var newItem = item;
				newItem.quantity = 1
				return newItem
			}) 

			this.setState({ sCart: [ ...newList ] }, () => { console.log("CHECKOUTMODE sCart:", this.state.sCart)});

		} else {
			this.setState({ sCart: [ ...this.props.shoppingCart] });
		}
	}
	

	render(){

		// console.log("Checkout PROPS:", this.props);

		if (this.props.finishedCheckout) {
			return <Redirect to="/completed" />
		}

		return(
			<div className="container-fluid">

				<div className="row">

					<div className="col-md-8">

						<CheckoutFormWrapper { ...this.props } />

					</div>


					<div className="col-md">
						
						<CheckoutSidebar shoppingCart={ this.state.sCart } />
						
					</div>

				</div>

			</div>
		);
	}
}

Checkout.propTypes = {
	shoppingCart: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
			quantity: PropTypes.number.isRequired
		})
	).isRequired,
	finishedCheckout: PropTypes.bool.isRequired
}

export default Checkout;