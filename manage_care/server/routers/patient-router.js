'use strict';

const express = require('express');
const patientRouter = express.Router();
const { Patients } = require('../models/patient-model');


/* ========== GET/READ ALL ITEMS ========== */
patientRouter.get('/patient', (req, res) => {
	console.log('enter GET end point');
	Patients.get()
		.then(patient => res.status(200).json(patient.serialize()))
		.catch(err => {
			res.status(500).json({ error: 'Something went wrong: GET Patients' });
		});
});

/* ========== GET/READ SINGLE ITEMS ========== */
patientRouter.get('/patient/:id', (req, res) => {
	console.log('enter GET/id end point');
	Patients.get(req.params.id)
		.then(patient => res.status(201).json(patient.serialize()))
		.catch(err => {
			res.status(500).json({ message: 'Somthing went wrong: GET Patient by ID' });
		});
});

/* ========== POST/CREATE ITEM ========== */
patientRouter.post('/patient', (req, res) => {
	console.log('enter post end point');
	const patientName = {
		firstname: req.body.name.firstname,
		lastname: req.body.name.lastname
	};
	const name = req.body.medication.name;
	const dosage = req.body.medication.dosage;
	const schedule = req.body.medication.schedule;
	const pharmacy = {
		name: req.body.medication.pharmacy.name,
		address: req.body.medication.pharmacy.address,
		phoneNumber: req.body.mediction.pharmacy.phoneNumber
	};
	const physician = {
		name: req.body.medication.pharmacy.name,
		address: req.body.medication.physician.address,
		phoneNumber: req.body.medication.pharmacy.phoneNumber
	};
	Patients.create(patientName, name, dosage, schedule, pharmacy, physician)
		.then(patient => res.status(201).json(patient.serialize()))
		.catch(err => {
			res.status(500).json({ message: "Internal server error'});" });
		});
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
patientRouter.put('/patient/:id', (req, res) => {
	console.log('enter put end point');
	const id = req.params.id;
	const name = req.body.medication.name;
	const dosage = req.body.medication.dosage;
	const schedule = req.body.medication.schedule;
	const pharmacy = {
		name: req.body.pharmacy.name,
		address: req.body.pharmacy.address,
		phoneNumber: req.body.pharmacy.phoneNumber
	};
	const physician = {
		name: req.body.pharmacy.name,
		address: req.body.physician.address,
		phoneNumber: req.body.pharmacy.phoneNumber
	};

	Patients.update(id, name, dosage, schedule, pharmacy, physician)
		.then(res => res.status(204).end())
		.catch(err => {
			res.status(500).json({ message: 'Something went wrong: Update Patient' });
		});
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
patientRouter.delete('/patient/:id', (req, res) => {
	console.log('enter delete end point');
	Patients.delete(req.params.id)
		.then(res => res.status(204).end())
		.catch(err => {
			res.status(500).json({ message: 'Something went wrong: Delete Patient' });
		});
});


module.exports = patientRouter;