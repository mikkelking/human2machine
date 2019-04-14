import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Comments = new Mongo.Collection("comments");

Comments.userCanInsert = function(userId, doc) {
	return true;
};

Comments.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","editor"]);
};

Comments.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};
