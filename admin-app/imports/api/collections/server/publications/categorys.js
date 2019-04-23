import {Meteor} from "meteor/meteor";
import {Categorys} from "/imports/api/collections/both/categorys.js";
import {Users} from "meteor-user-roles";

Meteor.publish("category_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Categorys.find({}, {sort:{name:1}});
	}
	return this.ready();
});

Meteor.publish("category_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Categorys.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("category_details", function(categoryId) {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Categorys.find({_id:categoryId}, {});
	}
	return this.ready();
});

