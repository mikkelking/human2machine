import {Permissions} from "/imports/api/collections/both/permissions.js";

Meteor.methods({
	"permissionsInsert": function(data) {
		if(!Permissions.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Permissions.insert(data);
	},

	"permissionsUpdate": function(id, data) {
		var doc = Permissions.findOne({ _id: id });
		if(!Permissions.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Permissions.update({ _id: id }, { $set: data });
	},

	"permissionsRemove": function(id) {
		var doc = Permissions.findOne({ _id: id });
		if(!Permissions.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Permissions.remove({ _id: id });
	}
});
