import {Platforms} from "/imports/api/collections/both/platforms.js";

Meteor.methods({
	"platformsInsert": function(data) {
		if(!Platforms.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Platforms.insert(data);
	},

	"platformsUpdate": function(id, data) {
		var doc = Platforms.findOne({ _id: id });
		if(!Platforms.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Platforms.update({ _id: id }, { $set: data });
	},

	"platformsRemove": function(id) {
		var doc = Platforms.findOne({ _id: id });
		if(!Platforms.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Platforms.remove({ _id: id });
	}
});
