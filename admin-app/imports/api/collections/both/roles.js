import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Roles = new Mongo.Collection("roles");

Roles.userCanInsert = function(userId, doc) {
	return true;
};

Roles.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","editor"]);
};

Roles.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};
