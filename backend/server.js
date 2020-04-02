const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

require('dotenv').config()	// load env vars

// const pingHeroku = require(path.join(__dirname, '/ping-heroku.js'));
// pingHeroku("https://<myherokuname>.herokuapp.com", millisecondsDelay);

// INSTANTIATE APP 
const app = express();
const httpServer = require("http").Server(app);	// instantiate http server

const router = require("express").Router();	// instantiate router

const api_port = process.env.PORT || 3001;


// LOAD MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// CREATE SOCKET
const io = require("socket.io")(httpServer);
app.set('socketio', io)	// assign io object to var for access in routes file

// io.on("connection", (clientSocket) => {
// 	clientSocket.on("clientEmitEvent", (data) => {
// 	 		console.log("clientEmitEvent client data:", data);
// 	})

// 	clientSocket.emit("checkConnection", {'SERVER_KEY': 'SERVER_VALUE'});

// })

// ROUTE TO PAYMENT PORTAL CHECKOUT VERSION
app.get('/server-checkout-mode', (req, res) => {

	/**
		If route is visited (/server-checkout-mode), 
		then use io to emit to client socket on front-end 
		with event "checkAppMode" and payload "CHECKOUT"
	**/

	console.log("SERVER CHECKOUT MODE");

	var io = req.app.get('socketio');	// get socket io object within route

	console.log("IO object:", io);

	// https://socket.io/docs/emit-cheatsheet/
	// io emit to particular socket ("checkAppMode", "CHECKOUT");
	io.local.emit("checkAppMode", "CHECKOUT")
})



/**
// DATABASE
const dbRoute = process.env.MONGOLAB_URI;	// use env var to hide db key for production build deployment to Heroku
const dbRoute = require("./config/keys.js").mongoURI;	// cloud db url stored in config file

mongoose
	.connect(
		dbRoute,
		{useNewUrlParser: true}
	)
	.then(() => console.log("connected to MongoDB database"))
	.catch((err) => console.log("error connecting to MongoDB:", err));
**/

// SERVE REACT SCRIPTS

app.use(express.static(path.join(__dirname, '/../', 'client', 'build')));	// Adds the react production build to serve react requests

app.get('*', (req, res) => {
	
	// serve index for all non-specified routes
	res.sendFile(path.join(__dirname, '/../', 'client', 'build', 'index.html'));
});


// ROUTES
app.use("/api", require('./routes'));	// routes for api requests: root/api/<specific_route>

module.exports = httpServer.listen(api_port, () => console.log(`Listening to ${api_port}`) );