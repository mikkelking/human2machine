import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Deployments = new Mongo.Collection("deployments");

Deployments.userCanInsert = function(userId, doc) {
	return true;
};

Deployments.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","editor"]);
};

Deployments.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};
