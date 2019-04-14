import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Docs = new Mongo.Collection("docs");

Docs.userCanInsert = function(userId, doc) {
	return true;
};

Docs.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","editor"]);
};

Docs.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};
