import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Permissions = new Mongo.Collection("permissions");

Permissions.userCanInsert = function(userId, doc) {
	return true;
};

Permissions.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","editor"]);
};

Permissions.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};
