import {Categorys} from "/imports/api/collections/both/categorys.js";

Meteor.methods({
	"categorysInsert": function(data) {
		if(!Categorys.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Categorys.insert(data);
	},

	"categorysUpdate": function(id, data) {
		var doc = Categorys.findOne({ _id: id });
		if(!Categorys.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Categorys.update({ _id: id }, { $set: data });
	},

	"categorysRemove": function(id) {
		var doc = Categorys.findOne({ _id: id });
		if(!Categorys.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Categorys.remove({ _id: id });
	}
});
