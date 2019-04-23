import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Tenancys = new Mongo.Collection("tenancys");

Tenancys.userCanInsert = function(userId, doc) {
	return true;
};

Tenancys.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","editor"]);
};

Tenancys.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};
