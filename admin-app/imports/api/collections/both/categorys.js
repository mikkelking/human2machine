import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Categorys = new Mongo.Collection("categorys");

Categorys.userCanInsert = function(userId, doc) {
	return true;
};

Categorys.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","editor"]);
};

Categorys.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};
