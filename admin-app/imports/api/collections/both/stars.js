import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Stars = new Mongo.Collection("stars");

Stars.userCanInsert = function(userId, doc) {
	return true;
};

Stars.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","editor"]);
};

Stars.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};
