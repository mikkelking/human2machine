import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const MenuItems = new Mongo.Collection("menuItems");

MenuItems.userCanInsert = function(userId, doc) {
	return true;
};

MenuItems.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","editor"]);
};

MenuItems.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};
