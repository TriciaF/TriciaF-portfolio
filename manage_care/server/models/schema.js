'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


//schema definition for the medicine database
const medicineSchema = mongoose.Schema({
	name: String
});

//schema definition for the pateint database
const patientSchema = mongoose.Schema({
	name: { firstname: String, lastName: String, default: '' },
	medication: [{
		name: String,
		dosage: String,
		schedule: String,
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
	}],
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
					${this.name.lastName}`.trim();

});

//defined virtual for pharmacy
patientSchema.virtual('pharmacy').get(function() {
	return `${this.medication.pharmacy.name} 
					${this.medication.pharmacy.address}
					${this.medication.pharmacy.phoneNumber}`.trim();
});

//defined virtual for physician
patientSchema.virtual('physician').get(function() {
	return `${this.medication.physician.name}
					${this.medication.physician.address}
					${this.medication.physician.phoneNumber}`.trim();
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
		name: this.name,
		medicationName: this.medication.name,
		Dosage: this.medication.dosage,
		Schedule: this.medication.schedule,
		Pharmacy: this.pharmacy,
		Physician: this.physician
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
const Patients = mongoose.model('Patients', patientSchema);
const Users = mongoose.model('Users', UserSchema);

module.exports = { Medicines, Patients, Users };