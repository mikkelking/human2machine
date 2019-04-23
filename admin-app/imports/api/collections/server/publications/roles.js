import {Meteor} from "meteor/meteor";
import {Roles} from "/imports/api/collections/both/roles.js";
import {Users} from "meteor-user-roles";

Meteor.publish("role_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Roles.find({}, {sort:{name:1}});
	}
	return this.ready();
});

Meteor.publish("role_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Roles.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("role_details", function(roleId) {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Roles.find({_id:roleId}, {});
	}
	return this.ready();
});

