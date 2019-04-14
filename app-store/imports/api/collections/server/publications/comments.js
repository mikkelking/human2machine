import {Meteor} from "meteor/meteor";
import {Comments} from "/imports/api/collections/both/comments.js";
import * as databaseUtils from "/imports/modules/both/database_utils.js";
import * as objectUtils from "/imports/modules/both/object_utils.js";
import {Users} from "meteor-user-roles";

Meteor.publish("comment_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Comments.find({}, {sort:{name:1}});
	}
	return this.ready();
});

Meteor.publish("comment_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Comments.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("comment_details", function(commentId) {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Comments.find({_id:commentId}, {});
	}
	return this.ready();
});

Meteor.publish("comment_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Comments.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions));
	}
	return this.ready();
});

Meteor.publish("comment_list_paged_count", function(extraOptions) {
	Counts.publish(this, "comment_list_paged_count", Comments.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"commentListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
			var data = Comments.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
	}
});

