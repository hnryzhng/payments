import React, { Component } from 'react';

import '../styles.css';

import logoImage from './static/logo200x200.png'

class Logo extends Component {
	render() {
		return(
			<div id="logo-container">
				<img className="d-flex" id="logo-img" src={ logoImage } alt="" />
			</div>
		)		
	}
}

export default Logo;