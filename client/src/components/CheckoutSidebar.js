import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './CheckoutSidebar.css'

class CheckoutSidebar extends Component {

	state = {
		itemsList: []
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

	render(){

		// console.log("shopping cart list:", this.props.shoppingCart);

		return(
			<div id="checkout-sidebar" className="container-fluid">
				
				<div id="checkout-sidebar-header">
					<h5 id="checkout-sidebar-heading">Your Order</h5>
				</div>

				<hr className="checkout-sidebar-line" />

				<div id="checkout-sidebar-cost-summary">

					<div id="checkout-sidebar-subtotal">
						<p>Subtotal: { this.calcSubtotal() }</p>
					</div>

					<div id="checkout-sidebar-shipping">
						<p>Shipping: Free</p>
					</div>

					<hr className="checkout-sidebar-line" />

					<div id="checkout-sidebar-total">
						<p>Total: ${ this.calcSubtotal() }</p>
					</div>

				</div>

				<hr className="checkout-sidebar-line" />

				<ul id="cart-sidebar-items-list" className="container-fluid">
					{ 
						this.props.shoppingCart.map((itemObj, index) => {
							if (itemObj) {
								return(<SidebarItem key={ itemObj.id } itemObj={ itemObj }/>)
							}
						})
					}
				</ul>


			</div>
		)
	}
}

class SidebarItem extends Component {
	render(){
		const { itemObj } = this.props;

		let fullImagePath;
		fullImagePath = './static/' + itemObj.image_path;

		return(
			<li key={ itemObj.id } className="row d-flex align-items-center">
				<img className="checkout-sidebar-item-image mr-md-2" src={ require( `${ fullImagePath }`) } alt="..." />
				<div className="checkout-sidebar-item-name mr-md-4">{ itemObj.name }</div>
				<div className="checkout-sidebar-item-price-quantity align-self-center">{ itemObj.quantity } X ${ itemObj.price }</div>
			</li>
		)
	}
}


CheckoutSidebar.propTypes = {
	shoppingCart: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired, 
			name: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
			quantity: PropTypes.number.isRequired
		})
	)
}

export default CheckoutSidebar;