import {Meteor} from "meteor/meteor";
import {Approvals} from "/imports/api/collections/both/approvals.js";
import * as databaseUtils from "/imports/modules/both/database_utils.js";
import * as objectUtils from "/imports/modules/both/object_utils.js";
import {Users} from "meteor-user-roles";

Meteor.publish("approval_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Approvals.publishJoinedCursors(Approvals.find({}, {sort:{name:1}}));
	}
	return this.ready();
});

Meteor.publish("approval_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Approvals.publishJoinedCursors(Approvals.find({_id:null}, {}));
	}
	return this.ready();
});

Meteor.publish("approval_details", function(approvalId) {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Approvals.publishJoinedCursors(Approvals.find({_id:approvalId}, {}));
	}
	return this.ready();
});

Meteor.publish("approval_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Approvals.publishJoinedCursors(Approvals.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)));
	}
	return this.ready();
});

Meteor.publish("approval_list_paged_count", function(extraOptions) {
	Counts.publish(this, "approval_list_paged_count", Approvals.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"approvalListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
			var data = Approvals.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
	}
});

