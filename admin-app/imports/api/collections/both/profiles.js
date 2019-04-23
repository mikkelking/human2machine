import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Profiles = new Mongo.Collection("profiles");

Profiles.userCanInsert = function(userId, doc) {
	return true;
};

Profiles.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","editor"]);
};

Profiles.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};
