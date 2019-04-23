import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const MiniApps = new Mongo.Collection("miniApps");

MiniApps.userCanInsert = function(userId, doc) {
	return true;
};

MiniApps.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","editor"]);
};

MiniApps.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};
