import {Meteor} from "meteor/meteor";
import {Platforms} from "/imports/api/collections/both/platforms.js";
import * as databaseUtils from "/imports/modules/both/database_utils.js";
import * as objectUtils from "/imports/modules/both/object_utils.js";
import {Users} from "meteor-user-roles";

Meteor.publish("platform_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Platforms.find({}, {sort:{name:1}});
	}
	return this.ready();
});

Meteor.publish("platform_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Platforms.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("platform_details", function(platformId) {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Platforms.find({_id:platformId}, {});
	}
	return this.ready();
});

Meteor.publish("platform_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Platforms.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions));
	}
	return this.ready();
});

Meteor.publish("platform_list_paged_count", function(extraOptions) {
	Counts.publish(this, "platform_list_paged_count", Platforms.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"platformListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
			var data = Platforms.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
	}
});

