import {Meteor} from "meteor/meteor";
import {Tenancys} from "/imports/api/collections/both/tenancys.js";
import {Users} from "meteor-user-roles";

Meteor.publish("tenancy_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Tenancys.find({}, {sort:{name:1}});
	}
	return this.ready();
});

Meteor.publish("tenancy_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Tenancys.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("tenancy_details", function(tenancyId) {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Tenancys.find({_id:tenancyId}, {});
	}
	return this.ready();
});

