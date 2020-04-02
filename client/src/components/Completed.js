import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Completed.css';

class Completed extends Component {
	render(){
		const { name, email } = this.props.customerInfo;

		return(
			<div id="completed-section" className="shadow-sm bg-white rounded" style={{ display: this.props.finishedCheckout? 'block' : 'none' }}>
				<p><b>{ name }</b>, the invoice for your order has been sent to your email at <b>{ email }</b></p>
				<p>Thanks!</p>
			</div>
		)
	}
}

Completed.propTypes = {
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
	finishedCheckout: PropTypes.bool.isRequired
}

export default Completed;
