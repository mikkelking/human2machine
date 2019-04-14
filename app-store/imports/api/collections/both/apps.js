import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Apps = new Mongo.Collection("apps");

Apps.userCanInsert = function(userId, doc) {
	return true;
};

Apps.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","editor"]);
};

Apps.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};
