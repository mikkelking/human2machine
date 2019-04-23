import {Meteor} from "meteor/meteor";
import {MiniApps} from "/imports/api/collections/both/mini_apps.js";
import * as databaseUtils from "/imports/modules/both/database_utils.js";
import * as objectUtils from "/imports/modules/both/object_utils.js";
import {Users} from "meteor-user-roles";

Meteor.publish("miniapp_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return MiniApps.publishJoinedCursors(MiniApps.find({}, {sort:{name:1}}));
	}
	return this.ready();
});

Meteor.publish("miniapp_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return MiniApps.publishJoinedCursors(MiniApps.find({_id:null}, {}));
	}
	return this.ready();
});

Meteor.publish("miniapp_details", function(miniAppId) {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return MiniApps.publishJoinedCursors(MiniApps.find({_id:miniAppId}, {}));
	}
	return this.ready();
});

Meteor.publish("miniapp_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return MiniApps.publishJoinedCursors(MiniApps.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)));
	}
	return this.ready();
});

Meteor.publish("miniapp_list_paged_count", function(extraOptions) {
	Counts.publish(this, "miniapp_list_paged_count", MiniApps.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"miniappListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
			var data = MiniApps.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
	}
});

