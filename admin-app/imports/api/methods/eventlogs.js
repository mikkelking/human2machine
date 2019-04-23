import {Eventlogs} from "/imports/api/collections/both/eventlogs.js";

Meteor.methods({
	"eventlogsInsert": function(data) {
		if(!Eventlogs.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Eventlogs.insert(data);
	},

	"eventlogsUpdate": function(id, data) {
		var doc = Eventlogs.findOne({ _id: id });
		if(!Eventlogs.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Eventlogs.update({ _id: id }, { $set: data });
	},

	"eventlogsRemove": function(id) {
		var doc = Eventlogs.findOne({ _id: id });
		if(!Eventlogs.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Eventlogs.remove({ _id: id });
	}
});
