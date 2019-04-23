import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Versions = new Mongo.Collection("versions");

Versions.userCanInsert = function(userId, doc) {
	return true;
};

Versions.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","editor"]);
};

Versions.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};
