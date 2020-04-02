import React, { Component } from 'react';
import './Navibar.css';

import Logo from './Logo.js';

class NaviBar extends Component {
	render() {
		return(
			<nav id="navbar" className="navbar navbar-expand-md shadow-sm bg-white rounded">

				<Logo />

			</nav>
		)
	}
}

export default NaviBar;