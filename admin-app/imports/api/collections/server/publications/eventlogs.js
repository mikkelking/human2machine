import {Meteor} from "meteor/meteor";
import {Eventlogs} from "/imports/api/collections/both/eventlogs.js";
import {Users} from "meteor-user-roles";

Meteor.publish("eventlog_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Eventlogs.find({}, {sort:{name:1}});
	}
	return this.ready();
});

Meteor.publish("eventlog_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Eventlogs.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("eventlog_details", function(eventlogId) {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Eventlogs.find({_id:eventlogId}, {});
	}
	return this.ready();
});

