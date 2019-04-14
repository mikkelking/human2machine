import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {Comments} from "/imports/api/collections/both/comments.js";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";


export class CommentsDetailsPage extends Component {
	constructor () {
		super();
		
	}

	componentWillMount() {
		
	}

	componentWillUnmount() {
		
	}

	componentDidMount() {
		

		Meteor.defer(function() {
			globalOnRendered();
		});
	}

	

	

	render() {
		if(this.props.data.dataLoading) {
			return (
				<Loading />
			);
		} else {
			return (
				<div>
					<div className="page-container container" id="content">
						<div className="row" id="title_row">
							<div className="col-md-12">
							</div>
						</div>
						<CommentsDetailsPageDetailsForm data={this.props.data} routeParams={this.props.routeParams} />
					</div>
				</div>
			);
		}
	}
}

export const CommentsDetailsPageContainer = withTracker(function(props) {



	let isReady = function() {
		

		let subs = [
			Meteor.subscribe("comment_details", props.routeParams.commentId)
		];
		let ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	};

	let data = { dataLoading: true };

	if(isReady()) {
		

		data = {

				comment_details: Comments.findOne({_id:props.routeParams.commentId}, {})
			};
		

		
	}
	return { data: data };

})(CommentsDetailsPage);

export class CommentsDetailsPageDetailsForm extends Component {
	constructor () {
		super();

		this.state = {
			commentsDetailsPageDetailsFormErrorMessage: "",
			commentsDetailsPageDetailsFormInfoMessage: ""
		};

		this.renderErrorMessage = this.renderErrorMessage.bind(this);
		this.renderInfoMessage = this.renderInfoMessage.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onBack = this.onBack.bind(this);
		
	}

	componentWillMount() {
		
	}

	componentWillUnmount() {
		
	}

	componentDidMount() {
		

		$("select[data-role='tagsinput']").tagsinput();
		$(".bootstrap-tagsinput").addClass("form-control");
		$("input[type='file']").fileinput();
	}

	renderErrorMessage() {
		return(
			<div className="alert alert-warning">
				{this.state.commentsDetailsPageDetailsFormErrorMessage}
			</div>
		);
	}

	renderInfoMessage() {
		return(
			<div className="alert alert-success">
				{this.state.commentsDetailsPageDetailsFormInfoMessage}
			</div>
		);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ commentsDetailsPageDetailsFormInfoMessage: "" });
		this.setState({ commentsDetailsPageDetailsFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var commentsDetailsPageDetailsFormMode = "read_only";
			if(!$("#comments-details-page-details-form").find("#form-cancel-button").length) {
				switch(commentsDetailsPageDetailsFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ commentsDetailsPageDetailsFormInfoMessage: message });
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ commentsDetailsPageDetailsFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	}

	onCancel(e) {
		e.preventDefault();
		self = this;
		

		/*CANCEL_REDIRECT*/
	}

	onClose(e) {
		e.preventDefault();
		self = this;

		FlowRouter.go("comments", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		FlowRouter.go("comments", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	

	

	render() {
		let self = this;
		return (
			<div id="comments-details-page-details-form" className="">
				<h2 id="component-title">
					<span id="form-back-button">
						<a href="#" className="btn btn-default" title="back" onClick={this.onBack}>
							<span className="fa fa-chevron-left">
							</span>
						</a>
						&nbsp;
					</span>
					<span id="component-title-icon" className="">
					</span>
					Details
				</h2>
				<form role="form" onSubmit={this.onSubmit}>
					{this.state.commentsDetailsPageDetailsFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.commentsDetailsPageDetailsFormInfoMessage ? this.renderInfoMessage() : null}
								<div className="form-group  field-who">
									<label htmlFor="who">
										Who
									</label>
									<div className="input-div">
										<p className="form-control-static  control-field-who">
											{this.props.data.comment_details.who}
										</p>
									</div>
								</div>
										<div className="form-group  field-user-id">
						<label htmlFor="userId">
							User
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-user-id">
								{this.props.data.comment_details.userId}
							</p>
						</div>
					</div>
					<div className="form-group  field-when">
						<label htmlFor="when">
							When
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-when">
								{dateUtils.formatDate(this.props.data.comment_details.when, '')}
							</p>
						</div>
					</div>
					<div className="form-group  field-comment">
						<label htmlFor="comment">
							Comment
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-comment">
								{this.props.data.comment_details.comment}
							</p>
						</div>
					</div>
					<div className="form-group  field-objecttype">
						<label htmlFor="objecttype">
							Objecttype
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-objecttype">
								{this.props.data.comment_details.objecttype}
							</p>
						</div>
					</div>
					<div className="form-group  field-object-id">
						<label htmlFor="objectId">
							Object
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-object-id">
								{this.props.data.comment_details.objectId}
							</p>
						</div>
					</div>
					<div className="form-group">
						<div className="submit-div btn-toolbar">
							<a href="#" id="form-close-button" className="btn btn-primary" onClick={this.onClose}>
								OK
							</a>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

