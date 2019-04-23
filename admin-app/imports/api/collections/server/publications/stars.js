import {Meteor} from "meteor/meteor";
import {Stars} from "/imports/api/collections/both/stars.js";
import * as databaseUtils from "/imports/modules/both/database_utils.js";
import * as objectUtils from "/imports/modules/both/object_utils.js";
import {Users} from "meteor-user-roles";

Meteor.publish("star_list", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Stars.publishJoinedCursors(Stars.find({}, {sort:{name:1}}));
	}
	return this.ready();
});

Meteor.publish("star_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Stars.publishJoinedCursors(Stars.find({_id:null}, {}));
	}
	return this.ready();
});

Meteor.publish("star_details", function(starId) {
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Stars.publishJoinedCursors(Stars.find({_id:starId}, {}));
	}
	return this.ready();
});

Meteor.publish("star_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
		return Stars.publishJoinedCursors(Stars.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)));
	}
	return this.ready();
});

Meteor.publish("star_list_paged_count", function(extraOptions) {
	Counts.publish(this, "star_list_paged_count", Stars.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"starListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","viewer","editor"])) {
			var data = Stars.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
	}
});

