import {Meteor} from "meteor/meteor";
import {MenuItems} from "/imports/api/collections/both/menu_items.js";
import * as databaseUtils from "/imports/modules/both/database_utils.js";
import * as objectUtils from "/imports/modules/both/object_utils.js";
import {Users} from "meteor-user-roles";

Meteor.publish("menuitem_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return MenuItems.publishJoinedCursors(MenuItems.find({}, {sort:{name:1}}));
	}
	return this.ready();
});

Meteor.publish("menuitem_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return MenuItems.publishJoinedCursors(MenuItems.find({_id:null}, {}));
	}
	return this.ready();
});

Meteor.publish("menuitem_details", function(menuItemId) {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return MenuItems.publishJoinedCursors(MenuItems.find({_id:menuItemId}, {}));
	}
	return this.ready();
});

Meteor.publish("menuitem_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return MenuItems.publishJoinedCursors(MenuItems.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)));
	}
	return this.ready();
});

Meteor.publish("menuitem_list_paged_count", function(extraOptions) {
	Counts.publish(this, "menuitem_list_paged_count", MenuItems.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"menuitemListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
			var data = MenuItems.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
	}
});

