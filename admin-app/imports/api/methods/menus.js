import {Menus} from "/imports/api/collections/both/menus.js";

Meteor.methods({
	"menusInsert": function(data) {
		if(!Menus.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Menus.insert(data);
	},

	"menusUpdate": function(id, data) {
		var doc = Menus.findOne({ _id: id });
		if(!Menus.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Menus.update({ _id: id }, { $set: data });
	},

	"menusRemove": function(id) {
		var doc = Menus.findOne({ _id: id });
		if(!Menus.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Menus.remove({ _id: id });
	}
});
