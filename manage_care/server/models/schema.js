'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


//schema definition for the medicine database
const medicineSchema = mongoose.Schema({
	name: String
});

//schema definition for the pateint database
const patientSchema = mongoose.Schema({
	name: {
		firstname: String,
		lastname: String
	},
	medication: {
		name: String,
		dosage: String,
		schedule: String
	},
	pharmacy: {
		name: String,
		address: String,
		phoneNumber: String
	},
	physician: {
		name: String,
		address: String,
		phoneNumber: String
	},
});

//schema definition for user login
const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});


//defined virtual for patient name
patientSchema.virtual('patientName').get(function() {
	return `${this.name.firstname} 
					${this.name.lastname}`.trim();

});

// // //defined virtual for medication
patientSchema.virtual('medicationInfo').get(function() {
	return `${this.medication.name}
          ${this.medication.dosage}
          ${this.medication.schedule}`.trim();
});

//defined virtual for pharmacy
patientSchema.virtual('pharmacyInfo').get(function() {
	return `${this.pharmacy.name} 
					${this.pharmacy.address}
					${this.pharmacy.phoneNumber}`.trim();
});

// //defined virtual for physician
patientSchema.virtual('physicianInfo').get(function() {
	return `${this.physician.name}
					${this.physician.address}
					${this.physician.phoneNumber}`.trim();
});


//serialize method for medicine schema
medicineSchema.methods.serialize = function() {
	return {
		id: this._id,
		name: this.name
	};
};

//serialize method for patient schema
patientSchema.methods.serialize = function() {
	return {
		id: this._id,
		name: this.patientName,
		medication: this.medicationInfo,
		pharmacy: this.pharmacyInfo,
		physician: this.physicianInfo
	};
};

//validate passwords
UserSchema.methods.validatePassword = function(password) {
	return bcrypt.compare(password, this.password);
};

UserSchema.methods.hashPassword = function(password) {
	return bcrypt.hash(password, 10);
};


//declare and export models
const Medicines = mongoose.model('Medicines', medicineSchema);
const Patients = mongoose.model('Patients', patientSchema, 'patientDb');
const Users = mongoose.model('Users', UserSchema);

module.exports = { Medicines, Patients, Users };