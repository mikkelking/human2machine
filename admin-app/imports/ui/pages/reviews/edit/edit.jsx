import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {MiniApps} from "/imports/api/collections/both/mini_apps.js";
import {Reviews} from "/imports/api/collections/both/reviews.js";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";


export class ReviewsEditPage extends Component {
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
						<ReviewsEditPageEditForm data={this.props.data} routeParams={this.props.routeParams} />
					</div>
				</div>
			);
		}
	}
}

export const ReviewsEditPageContainer = withTracker(function(props) {



	let isReady = function() {
		

		let subs = [
			Meteor.subscribe("miniapp_list"),
			Meteor.subscribe("review_details", props.routeParams.reviewId)
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

				miniapp_list: MiniApps.find({}, {sort:{name:1}}).fetch(),
				review_details: Reviews.findOne({_id:props.routeParams.reviewId}, {})
			};
		

		
	}
	return { data: data };

})(ReviewsEditPage);

export class ReviewsEditPageEditForm extends Component {
	constructor () {
		super();

		this.state = {
			reviewsEditPageEditFormErrorMessage: "",
			reviewsEditPageEditFormInfoMessage: ""
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
				{this.state.reviewsEditPageEditFormErrorMessage}
			</div>
		);
	}

	renderInfoMessage() {
		return(
			<div className="alert alert-success">
				{this.state.reviewsEditPageEditFormInfoMessage}
			</div>
		);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ reviewsEditPageEditFormInfoMessage: "" });
		this.setState({ reviewsEditPageEditFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var reviewsEditPageEditFormMode = "update";
			if(!$("#reviews-edit-page-edit-form").find("#form-cancel-button").length) {
				switch(reviewsEditPageEditFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ reviewsEditPageEditFormInfoMessage: message });
					}; break;
				}
			}

			FlowRouter.go("reviews", objectUtils.mergeObjects(FlowRouter.current().params, {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ reviewsEditPageEditFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("reviewsUpdate", self.props.data.review_details._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	}

	onCancel(e) {
		e.preventDefault();
		self = this;
		

		FlowRouter.go("reviews", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	onClose(e) {
		e.preventDefault();
		self = this;

		/*CLOSE_REDIRECT*/
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		/*BACK_REDIRECT*/
	}

	

	

	render() {
		let self = this;
		return (
			<div id="reviews-edit-page-edit-form" className="">
				<h2 id="component-title">
					<span id="component-title-icon" className="">
					</span>
					Edit Reviews
				</h2>
				<form role="form" onSubmit={this.onSubmit}>
					{this.state.reviewsEditPageEditFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.reviewsEditPageEditFormInfoMessage ? this.renderInfoMessage() : null}
								<div className="form-group  field-name">
									<label htmlFor="name">
										Name
									</label>
									<div className="input-div">
										<input type="text" name="name" defaultValue={this.props.data.review_details.name} className="form-control " autoFocus="autoFocus" required="required" />
										<span id="help-text" className="help-block" />
										<span id="error-text" className="help-block" />
									</div>
								</div>
										<div className="form-group  field-description">
						<label htmlFor="description">
							Description
						</label>
						<div className="input-div">
							<input type="text" name="description" defaultValue={this.props.data.review_details.description} className="form-control " required="required" />
							<span id="help-text" className="help-block" />
							<span id="error-text" className="help-block" />
						</div>
					</div>
					<div className="form-group  field-mini-app-id">
						<label htmlFor="miniAppId">
							Mini App
						</label>
						<div className="input-div">
							<select className="form-control " name="miniAppId" defaultValue={this.props.data.review_details.miniAppId} required="required">
								{this.props.data.miniapp_list.map(function(item, index) { return(
								<option key={"dynamic-" + index} value={item._id}>									{item.name}</option>
								); }) }
							</select>
							<span id="help-text" className="help-block" />
							<span id="error-text" className="help-block" />
						</div>
					</div>
					<div className="form-group">
						<div className="submit-div btn-toolbar">
							<a href="#" id="form-cancel-button" className="btn btn-default" onClick={this.onCancel}>
								Cancel
							</a>
							<button id="form-submit-button" className="btn btn-success" type="submit">
								Save
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}
