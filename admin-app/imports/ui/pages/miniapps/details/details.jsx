import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {MiniApps} from "/imports/api/collections/both/mini_apps.js";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";


export class MiniappsDetailsPage extends Component {
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
						<MiniappsDetailsPageDetailsForm data={this.props.data} routeParams={this.props.routeParams} />
					</div>
				</div>
			);
		}
	}
}

export const MiniappsDetailsPageContainer = withTracker(function(props) {



	let isReady = function() {
		

		let subs = [
			Meteor.subscribe("miniapp_details", props.routeParams.miniAppId)
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

				miniapp_details: MiniApps.findOne({_id:props.routeParams.miniAppId}, {})
			};
		

		
	}
	return { data: data };

})(MiniappsDetailsPage);

export class MiniappsDetailsPageDetailsForm extends Component {
	constructor () {
		super();

		this.state = {
			miniappsDetailsPageDetailsFormErrorMessage: "",
			miniappsDetailsPageDetailsFormInfoMessage: ""
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
				{this.state.miniappsDetailsPageDetailsFormErrorMessage}
			</div>
		);
	}

	renderInfoMessage() {
		return(
			<div className="alert alert-success">
				{this.state.miniappsDetailsPageDetailsFormInfoMessage}
			</div>
		);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ miniappsDetailsPageDetailsFormInfoMessage: "" });
		this.setState({ miniappsDetailsPageDetailsFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var miniappsDetailsPageDetailsFormMode = "read_only";
			if(!$("#miniapps-details-page-details-form").find("#form-cancel-button").length) {
				switch(miniappsDetailsPageDetailsFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ miniappsDetailsPageDetailsFormInfoMessage: message });
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ miniappsDetailsPageDetailsFormErrorMessage: message });
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

		FlowRouter.go("miniapps", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		FlowRouter.go("miniapps", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	

	

	render() {
		let self = this;
		return (
			<div id="miniapps-details-page-details-form" className="">
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
					{this.state.miniappsDetailsPageDetailsFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.miniappsDetailsPageDetailsFormInfoMessage ? this.renderInfoMessage() : null}
								<div className="form-group  field-name">
									<label htmlFor="name">
										Name
									</label>
									<div className="input-div">
										<p className="form-control-static  control-field-name">
											{this.props.data.miniapp_details.name}
										</p>
									</div>
								</div>
										<div className="form-group  field-description">
						<label htmlFor="description">
							Description
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-description">
								{this.props.data.miniapp_details.description}
							</p>
						</div>
					</div>
					<div className="form-group  field-status">
						<label htmlFor="status">
							Status
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-status">
								{this.props.data.miniapp_details.status}
							</p>
						</div>
					</div>
					<div className="form-group  field-path">
						<label htmlFor="path">
							Path
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-path">
								{this.props.data.miniapp_details.path}
							</p>
						</div>
					</div>
					<div className="form-group  field-tag">
						<label htmlFor="tag">
							Tag
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-tag">
								{this.props.data.miniapp_details.tag}
							</p>
						</div>
					</div>
					<div className="form-group  field-manifest-url">
						<label htmlFor="manifestUrl">
							Manifest Url
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-manifest-url">
								{this.props.data.miniapp_details.manifestUrl}
							</p>
						</div>
					</div>
					<div className="form-group  field-platform-name">
						<label htmlFor="platform.name">
							Platform
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-platform-name">
								{this.props.data.miniapp_details.platform.name}
							</p>
						</div>
					</div>
					<div className="form-group  field-category-name">
						<label htmlFor="category.name">
							Category
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-category-name">
								{this.props.data.miniapp_details.category.name}
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

