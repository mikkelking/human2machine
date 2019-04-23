import {MiniApps} from "/imports/api/collections/both/mini_apps.js";

Meteor.methods({
	"miniAppsInsert": function(data) {
		if(!MiniApps.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return MiniApps.insert(data);
	},

	"miniAppsUpdate": function(id, data) {
		var doc = MiniApps.findOne({ _id: id });
		if(!MiniApps.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		MiniApps.update({ _id: id }, { $set: data });
	},

	"miniAppsRemove": function(id) {
		var doc = MiniApps.findOne({ _id: id });
		if(!MiniApps.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		MiniApps.remove({ _id: id });
	}
});
