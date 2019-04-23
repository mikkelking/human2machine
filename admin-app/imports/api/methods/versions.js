import {Versions} from "/imports/api/collections/both/versions.js";

Meteor.methods({
	"versionsInsert": function(data) {
		if(!Versions.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Versions.insert(data);
	},

	"versionsUpdate": function(id, data) {
		var doc = Versions.findOne({ _id: id });
		if(!Versions.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Versions.update({ _id: id }, { $set: data });
	},

	"versionsRemove": function(id) {
		var doc = Versions.findOne({ _id: id });
		if(!Versions.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Versions.remove({ _id: id });
	}
});
