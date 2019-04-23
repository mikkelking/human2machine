import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";

export const Reviews = new Mongo.Collection("reviews");

Reviews.userCanInsert = function(userId, doc) {
	return true;
};

Reviews.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","editor"]);
};

Reviews.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};
