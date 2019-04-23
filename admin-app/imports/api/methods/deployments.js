import {Deployments} from "/imports/api/collections/both/deployments.js";

Meteor.methods({
	"deploymentsInsert": function(data) {
		if(!Deployments.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Deployments.insert(data);
	},

	"deploymentsUpdate": function(id, data) {
		var doc = Deployments.findOne({ _id: id });
		if(!Deployments.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Deployments.update({ _id: id }, { $set: data });
	},

	"deploymentsRemove": function(id) {
		var doc = Deployments.findOne({ _id: id });
		if(!Deployments.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Deployments.remove({ _id: id });
	}
});
