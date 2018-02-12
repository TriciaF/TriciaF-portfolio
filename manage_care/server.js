'use strict';

//initailizations
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const morgan = require('morgan');
const patientRouter = require('./server/routers/patient-router');

const { PORT, DATABASE_URL } = require('./config');

const app = express();
app.use(morgan('common'));

//Send static files to client
app.use(express.static(path.join(__dirname, './client/public')));
//re-Route requests to our router
app.use('/', patientRouter);

//server functions
let server;

function runServer(dbUrl) {
	console.log('run server started');
	return new Promise((resolve, reject) => {
		mongoose.connect(dbUrl, { useMongoClient: true }, err => {
			if (err) {
				return reject(err);
			}
			server = app.listen(PORT, () => {
				console.log(`Your app is listening on port ${PORT}`);
				resolve();
			})
				.on('error', err => {
					mongoose.disconnect();
					reject(err);
				});
		});
	});
}

function closeServer() {
	console.log('close server start');
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) => {
			console.log('Closing server');
			server.close(err => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
	});
}

if (require.main === module) {
	runServer(DATABASE_URL).catch(err => console.error('Database did not start'));
}

module.exports = { app, runServer, closeServer };