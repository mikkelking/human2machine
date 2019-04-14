import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Platforms = new Mongo.Collection("platforms");

Platforms.userCanInsert = function(userId, doc) {
	return true;
};

Platforms.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","editor"]);
};

Platforms.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};
