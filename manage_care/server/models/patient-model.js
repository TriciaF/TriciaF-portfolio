'use strict';

const Patients = {
	create: function(patientName, name, dosage, schedule, pharmacy, physician) {
		console.log('Enter Patients:create');
		return Patients
			.create({
				name: { firstname: patientName.firstname, lastname: patientName.lastname },
				medication: [{
					name: name,
					dosage: dosage,
					schedule: schedule,
					pharmacy: {
						name: pharmacy.name,
						address: pharmacy.address,
						phoneNumber: pharmacy.phoneNumber
					},
					physician: {
						name: physician.name,
						address: physician.address,
						phoneNumber: physician.phoneNumber
					}
				}],
			});
	},

	get: function(id = null) {
		console.log('Enter Patients:Get');
		if (id === null) {
			return Patients.find();
		} else {
			return Patients.findById(id);
		}
	},

	update: function(id, patientName, name, dosage, schedule, pharmacy, physician) {
		console.log('Enter Patients:Update');
		const updateObj = {
			name: { firstname: patientName.firstname, lastname: patientName.lastname },
			medication: [{
				name: name,
				dosage: dosage,
				schedule: schedule,
				pharmacy: {
					name: pharmacy.name,
					address: pharmacy.address,
					phoneNumber: pharmacy.phoneNumber
				},
				physician: {
					name: physician.name,
					address: physician.address,
					phoneNumber: physician.phoneNumber
				},
			}],
		};
		return Patients
			.findByIdAndUpdate(id, { $set: updateObj });
	},

	delete: function(id) {
		console.log('Enter Patients:Delete');
		return Patients
			.findByIdAndRemove(id);
	}
};

module.export = { Patients };