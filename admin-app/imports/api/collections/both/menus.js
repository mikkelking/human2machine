import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Menus = new Mongo.Collection("menus");

Menus.userCanInsert = function(userId, doc) {
	return true;
};

Menus.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","editor"]);
};

Menus.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};
