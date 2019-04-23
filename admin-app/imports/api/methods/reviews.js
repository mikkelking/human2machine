import {Reviews} from "/imports/api/collections/both/reviews.js";

Meteor.methods({
	"reviewsInsert": function(data) {
		if(!Reviews.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Reviews.insert(data);
	},

	"reviewsUpdate": function(id, data) {
		var doc = Reviews.findOne({ _id: id });
		if(!Reviews.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Reviews.update({ _id: id }, { $set: data });
	},

	"reviewsRemove": function(id) {
		var doc = Reviews.findOne({ _id: id });
		if(!Reviews.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Reviews.remove({ _id: id });
	}
});
