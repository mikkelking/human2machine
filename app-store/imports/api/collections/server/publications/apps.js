import {Meteor} from "meteor/meteor";
import {Apps} from "/imports/api/collections/both/apps.js";
import * as databaseUtils from "/imports/modules/both/database_utils.js";
import * as objectUtils from "/imports/modules/both/object_utils.js";
import {Users} from "meteor-user-roles";

Meteor.publish("app_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Apps.find({}, {sort:{name:1}});
	}
	return this.ready();
});

Meteor.publish("app_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Apps.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("app_details", function(appId) {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Apps.find({_id:appId}, {});
	}
	return this.ready();
});

Meteor.publish("app_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Apps.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions));
	}
	return this.ready();
});

Meteor.publish("app_list_paged_count", function(extraOptions) {
	Counts.publish(this, "app_list_paged_count", Apps.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"appListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
			var data = Apps.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
	}
});

