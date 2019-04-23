import {Tenancys} from "/imports/api/collections/both/tenancys.js";

Meteor.methods({
	"tenancysInsert": function(data) {
		if(!Tenancys.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Tenancys.insert(data);
	},

	"tenancysUpdate": function(id, data) {
		var doc = Tenancys.findOne({ _id: id });
		if(!Tenancys.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Tenancys.update({ _id: id }, { $set: data });
	},

	"tenancysRemove": function(id) {
		var doc = Tenancys.findOne({ _id: id });
		if(!Tenancys.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Tenancys.remove({ _id: id });
	}
});
