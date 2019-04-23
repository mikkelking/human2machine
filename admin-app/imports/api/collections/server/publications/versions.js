import {Meteor} from "meteor/meteor";
import {Versions} from "/imports/api/collections/both/versions.js";
import {Users} from "meteor-user-roles";

Meteor.publish("version_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Versions.find({}, {sort:{name:1}});
	}
	return this.ready();
});

Meteor.publish("version_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Versions.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("version_details", function(versionId) {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Versions.find({_id:versionId}, {});
	}
	return this.ready();
});

