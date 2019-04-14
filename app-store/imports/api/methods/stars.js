import {Stars} from "/imports/api/collections/both/stars.js";

Meteor.methods({
	"starsInsert": function(data) {
		if(!Stars.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Stars.insert(data);
	},

	"starsUpdate": function(id, data) {
		var doc = Stars.findOne({ _id: id });
		if(!Stars.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Stars.update({ _id: id }, { $set: data });
	},

	"starsRemove": function(id) {
		var doc = Stars.findOne({ _id: id });
		if(!Stars.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Stars.remove({ _id: id });
	}
});
