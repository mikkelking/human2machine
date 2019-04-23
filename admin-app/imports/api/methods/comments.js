import {Comments} from "/imports/api/collections/both/comments.js";

Meteor.methods({
	"commentsInsert": function(data) {
		if(!Comments.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Comments.insert(data);
	},

	"commentsUpdate": function(id, data) {
		var doc = Comments.findOne({ _id: id });
		if(!Comments.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Comments.update({ _id: id }, { $set: data });
	},

	"commentsRemove": function(id) {
		var doc = Comments.findOne({ _id: id });
		if(!Comments.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Comments.remove({ _id: id });
	}
});
