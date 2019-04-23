import {Meteor} from "meteor/meteor";
import {Permissions} from "/imports/api/collections/both/permissions.js";
import {Users} from "meteor-user-roles";

Meteor.publish("permission_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Permissions.find({}, {sort:{name:1}});
	}
	return this.ready();
});

Meteor.publish("permission_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Permissions.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("permission_details", function(permissionId) {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Permissions.find({_id:permissionId}, {});
	}
	return this.ready();
});

