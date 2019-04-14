import {Apps} from "/imports/api/collections/both/apps.js";

Meteor.methods({
	"appsInsert": function(data) {
		if(!Apps.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Apps.insert(data);
	},

	"appsUpdate": function(id, data) {
		var doc = Apps.findOne({ _id: id });
		if(!Apps.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Apps.update({ _id: id }, { $set: data });
	},

	"appsRemove": function(id) {
		var doc = Apps.findOne({ _id: id });
		if(!Apps.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Apps.remove({ _id: id });
	}
});
