import {Meteor} from "meteor/meteor";
import {Reviews} from "/imports/api/collections/both/reviews.js";
import * as databaseUtils from "/imports/modules/both/database_utils.js";
import * as objectUtils from "/imports/modules/both/object_utils.js";
import {Users} from "meteor-user-roles";

Meteor.publish("review_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Reviews.publishJoinedCursors(Reviews.find({}, {sort:{name:1}}));
	}
	return this.ready();
});

Meteor.publish("review_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Reviews.publishJoinedCursors(Reviews.find({_id:null}, {}));
	}
	return this.ready();
});

Meteor.publish("review_details", function(reviewId) {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Reviews.publishJoinedCursors(Reviews.find({_id:reviewId}, {}));
	}
	return this.ready();
});

Meteor.publish("review_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Reviews.publishJoinedCursors(Reviews.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)));
	}
	return this.ready();
});

Meteor.publish("review_list_paged_count", function(extraOptions) {
	Counts.publish(this, "review_list_paged_count", Reviews.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"reviewListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
			var data = Reviews.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
	}
});

