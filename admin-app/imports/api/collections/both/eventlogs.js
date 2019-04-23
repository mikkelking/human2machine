import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Eventlogs = new Mongo.Collection("eventlogs");

Eventlogs.userCanInsert = function(userId, doc) {
	return true;
};

Eventlogs.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","editor"]);
};

Eventlogs.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};
