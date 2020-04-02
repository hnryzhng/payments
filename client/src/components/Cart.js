import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import PropTypes from 'prop-types'

// import itemImage from "./static/dress-woman-in-white-short-sleeved-dress-holding-brown-leather.jpg"
// import cartIcon from "./static/shopping-cart-icon.svg"

import './Cart.css'

class Cart extends Component {

	state = {
		returnToShopping: false
	}

	calcSubtotal = () => {

		// calculates subtotal on front-end

		const shoppingCart = this.props.shoppingCart;
		var subtotal = 0;

		for (var i=0; i<shoppingCart.length; i++) {
			const itemObj = shoppingCart[i];
			subtotal += itemObj.price * itemObj.quantity;
		}

		return subtotal;

	}

	continueShopping = () => {
		// console.log("continue shopping");
		// this.setState({ returnToShopping: true }, () => {console.log("set state returnToShopping true")})

	}

	handleDeleteItem = (item) => {
		this.props.delCartItem(item.id)
		this.props.updateItemDisplay(item.id, false)
	}

	handleSubmitCheckout = () => {
		if (this.props.shoppingCart.length > 0) {
			this.props.finishCart();
		}
	}

	generateFullImagePath = () => {

	}

	render() {
		if (!this.props.finishedShopping) {
			return <Redirect to="/shopping" />
		}

		if (this.props.finishedCart) {
			return <Redirect to="/checkout" />
		} 

		// console.log("CART props:", this.props)

		return(
			<div className="container-fluid" id="cart-page-container">

				<div className="row">

					<div className="col-md-8">

						<div className="container-fluid" id="cart">
							<img id="cart-icon" className="row" src={ require("./static/shopping-cart-icon.svg") } alt="..." />
							
							<hr />

							<ul id="cart-items-list" className="container-fluid">
								{ 
									this.props.shoppingCart.map((itemObj, index) => {
										if (itemObj) {

											return(
												<CartItem key={ itemObj.id } itemObj={ itemObj } />
											)
										}
									})
								}
							</ul>
						</div>
					</div>

					<div className="col-md-4">

						<div className="container-fluid" id="cart-sidebar">

							<div>
								<h5>Order Summary</h5>
							</div>

							<div>
								<p id="cart-subtotal">Subtotal: { this.calcSubtotal() }</p>
							</div>

							<div>
								<p id="cart-shipping">Shipping: Free</p>
							</div>

							<hr id="cart-sidebar-line" />

							<div>
								<p id="cart-total">Total: { this.calcSubtotal() }</p>
							</div>


							<button id="cart-checkout-button" className="btn btn-secondary" onClick={ () => { this.handleSubmitCheckout() } }> Proceed to Checkout </button>
							<button id="cart-shopping-button" className="btn btn-info" onClick={ () => { this.props.continueShopping() } }> Continue Shopping </button>

						</div>

					</div>

				</div>

			</div>

		)
	}
}

class CartItem extends Component {
	render(){

		const itemObj = this.props.itemObj;

		let fullImagePath;
		fullImagePath = "./static/" + itemObj.image_path;	// do this instead of in-line due to trouble dynamically generating link with React in Heroku

		return(

			<li key={ itemObj.id } className="row cart-item-container">
				
				<div className="container-fluid">

					<div className="row d-flex align-items-center">
						
						<div className="col-md">
							<img className="cart-item-image" src={ require(`${ fullImagePath }`) } alt="..." />
						</div>

						<div className="col-md  align-self-start">
							<p className="cart-item-name">{ itemObj.name }</p>

						</div>

						<div className="col-md">

							<p className="cart-item-price"> Price: ${ itemObj.price }</p>															
						
							<ItemQuantitySelect {...this.props} item={itemObj} />

							<div className="row">
								<button className="btn btn-link remove-item-link" onClick={ () => { this.handleDeleteItem(itemObj) } }>Remove</button>
							</div>

						</div>

					</div>

					<hr className="cart-item-line" />

				</div>

			</li>
		)
	}
}

class ItemQuantitySelect extends Component {

	state = {
		quantity: 0
	}

	componentWillMount() {
		// set component state to quantity of item in cart
		this.setState({ quantity: this.props.item.quantity });

	}

	handleUpdateQuantity = (event) => {
		// Set quantity
		this.setState({ quantity: event.target.value }, () => {
			// dispatch action ot update cart item quantity
			this.props.updateCartItem(this.props.item.id, this.state.quantity);
		});

		
	}

	handleDispatches = (item) => {
		this.props.updateCartItem(item.id, this.state.quantity)
		
		//BOOKMARK: have initial value dropdown capture item quantity
	}

	render(){
		
		var { item } = this.props;

		return(
			<div>
				<div className="item-select-quantity-container input-group">
					<label>Quantity:</label>
					<select className="custom-select" value={ this.state.quantity } onChange={ (event) => { this.handleUpdateQuantity(event) } }>
						<option value="0">0</option>
						<option value="1">1</option>
						<option value="2">2</option>
					</select>
				</div>

			</div>
		)
	}
}


Cart.propTypes = {
	shoppingCart: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
			quantity: PropTypes.number.isRequired
		})
	).isRequired,
	finishedCart: PropTypes.bool.isRequired
}

export default Cart;