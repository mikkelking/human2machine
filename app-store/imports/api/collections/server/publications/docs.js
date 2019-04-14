import {Meteor} from "meteor/meteor";
import {Docs} from "/imports/api/collections/both/docs.js";
import * as databaseUtils from "/imports/modules/both/database_utils.js";
import * as objectUtils from "/imports/modules/both/object_utils.js";
import {Users} from "meteor-user-roles";

Meteor.publish("doc_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Docs.find({}, {sort:{name:1}});
	}
	return this.ready();
});

Meteor.publish("doc_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Docs.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("doc_details", function(docId) {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Docs.find({_id:docId}, {});
	}
	return this.ready();
});

Meteor.publish("doc_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Docs.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions));
	}
	return this.ready();
});

Meteor.publish("doc_list_paged_count", function(extraOptions) {
	Counts.publish(this, "doc_list_paged_count", Docs.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"docListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
			var data = Docs.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
	}
});

