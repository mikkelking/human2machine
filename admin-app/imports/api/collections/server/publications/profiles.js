import {Meteor} from "meteor/meteor";
import {Profiles} from "/imports/api/collections/both/profiles.js";
import {Users} from "meteor-user-roles";

Meteor.publish("profile_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Profiles.find({}, {sort:{name:1}});
	}
	return this.ready();
});

Meteor.publish("profile_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Profiles.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("profile_details", function(profileId) {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Profiles.find({_id:profileId}, {});
	}
	return this.ready();
});

