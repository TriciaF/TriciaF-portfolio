'use strict';

const express = require('express');

const patientRouter = express.Router();
const { patients } = require('../models/patient-model');
const bodyParser = require('body-parser');

patientRouter.use(bodyParser.json());



/* ========== GET/READ ALL ITEMS ========== */
patientRouter.get('/patient', (req, res) => {
	console.log('enter GET end point');
	patients.get()
		.then(response => {
			res.json(response.map(item => item.serialize()));
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Something went wrong' });
		});
});

/* ========== GET/READ SINGLE ITEMS ========== */
patientRouter.get('/patient/:id', (req, res) => {
	console.log('enter GET/id end point');
	patients.get(req.params.id)
		.then(response => res.status(201).json(response.serialize()))
		.catch(err => {
			res.status(500).json({ message: 'Somthing went wrong: GET Patient by ID' });
		});
});

/* ========== POST/CREATE ITEM ========== */
patientRouter.post('/patient', (req, res) => {
	console.log('enter post end point');
	const requiredFields = ['name', 'medication', 'pharmacy', 'physician', ];

	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		console.log(field);
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}

	console.log(req.body.name.firstname);
	const patientName = {
		firstname: req.body.name.firstname,
		lastname: req.body.name.lastname
	};
	const medication = {
		name: req.body.medication.name,
		dosage: req.body.medication.dosage,
		schedule: req.body.medication.schedule
	};
	const pharmacy = {
		name: req.body.pharmacy.name,
		address: req.body.pharmacy.address,
		phoneNumber: req.body.pharmacy.phoneNumber
	};
	const physician = {
		name: req.body.physician.name,
		address: req.body.physician.address,
		phoneNumber: req.body.physician.phoneNumber
	};
	patients.create(patientName, medication, pharmacy, physician)
		.then(response => res.status(201).json(response.serialize()))
		.catch(err => {
			res.status(500).json({ message: "Internal server error'});" });
		});
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
patientRouter.put('/patient/:id', (req, res) => {
	console.log('enter put end point');
	const requiredFields = ['name', 'medication', 'pharmacy', 'physician', ];

	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		console.log(field);
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}
	const id = req.params.id;
	const patientName = {
		firstname: req.body.name.firstname,
		lastname: req.body.name.lastname
	};
	const medication = {
		name: req.body.medication.name,
		dosage: req.body.medication.dosage,
		schedule: req.body.medication.schedule
	};
	const pharmacy = {
		name: req.body.pharmacy.name,
		address: req.body.pharmacy.address,
		phoneNumber: req.body.pharmacy.phoneNumber
	};
	const physician = {
		name: req.body.physician.name,
		address: req.body.physician.address,
		phoneNumber: req.body.physician.phoneNumber
	};

	patients.update(id, patientName, medication, pharmacy, physician)
		.then(response => res.status(204).json(response))
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Something went wrong: Update Patient' });
		});
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
patientRouter.delete('/patient/:id', (req, res) => {
	console.log('enter delete end point');
	patients.delete(req.params.id)
		.then(response => res.status(204).json(response))
		.catch(err => {
			res.status(500).json({ message: 'Something went wrong: Delete Patient' });
		});
});


module.exports = patientRouter;