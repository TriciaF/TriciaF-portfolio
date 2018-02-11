'use strict';

const Patients = {
	create: function(name, dosage, schedule, pharmacy, physician) {
		return Patients
			.create({
				medication: {
					name: name,
					dosage: dosage,
					schedule: schedule
				},
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
			});
	},

	get: function(id = null) {
		if (id === null) {
			return Patients.find();
		} else {
			return Patients.findById(id);
		}
	},

	update: function(id, name, dosage, schedule, pharmacy, physician) {
		const updateObj = {
			medication: {
				name: name,
				dosage: dosage,
				schedule: schedule
			},
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
		};
		return Patients
			.findByIdAndUpdate(id, { $set: updateObj });
	},

	delete: function(id) {
		return Patients
			.findByIdAndRemove(id);
	}
};

module.export = { Patients };