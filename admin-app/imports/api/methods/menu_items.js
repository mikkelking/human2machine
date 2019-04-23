import {MenuItems} from "/imports/api/collections/both/menu_items.js";

Meteor.methods({
	"menuItemsInsert": function(data) {
		if(!MenuItems.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return MenuItems.insert(data);
	},

	"menuItemsUpdate": function(id, data) {
		var doc = MenuItems.findOne({ _id: id });
		if(!MenuItems.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		MenuItems.update({ _id: id }, { $set: data });
	},

	"menuItemsRemove": function(id) {
		var doc = MenuItems.findOne({ _id: id });
		if(!MenuItems.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		MenuItems.remove({ _id: id });
	}
});
