import {Approvals} from "/imports/api/collections/both/approvals.js";

Meteor.methods({
	"approvalsInsert": function(data) {
		if(!Approvals.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Approvals.insert(data);
	},

	"approvalsUpdate": function(id, data) {
		var doc = Approvals.findOne({ _id: id });
		if(!Approvals.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Approvals.update({ _id: id }, { $set: data });
	},

	"approvalsRemove": function(id) {
		var doc = Approvals.findOne({ _id: id });
		if(!Approvals.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Approvals.remove({ _id: id });
	}
});
