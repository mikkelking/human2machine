import {Docs} from "/imports/api/collections/both/docs.js";

Meteor.methods({
	"docsInsert": function(data) {
		if(!Docs.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Docs.insert(data);
	},

	"docsUpdate": function(id, data) {
		var doc = Docs.findOne({ _id: id });
		if(!Docs.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Docs.update({ _id: id }, { $set: data });
	},

	"docsRemove": function(id) {
		var doc = Docs.findOne({ _id: id });
		if(!Docs.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Docs.remove({ _id: id });
	}
});
