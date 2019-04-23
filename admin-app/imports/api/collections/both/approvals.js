import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Approvals = new Mongo.Collection("approvals");

Approvals.userCanInsert = function(userId, doc) {
	return true;
};

Approvals.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","editor"]);
};

Approvals.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};
