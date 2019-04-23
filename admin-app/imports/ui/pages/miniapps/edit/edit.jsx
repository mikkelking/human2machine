import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {Platforms} from "/imports/api/collections/both/platforms.js";
import {Categorys} from "/imports/api/collections/both/categorys.js";
import {MiniApps} from "/imports/api/collections/both/mini_apps.js";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";


export class MiniappsEditPage extends Component {
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
						<MiniappsEditPageEditForm data={this.props.data} routeParams={this.props.routeParams} />
					</div>
				</div>
			);
		}
	}
}

export const MiniappsEditPageContainer = withTracker(function(props) {



	let isReady = function() {
		

		let subs = [
			Meteor.subscribe("platform_list"),
			Meteor.subscribe("category_list"),
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

				platform_list: Platforms.find({}, {sort:{name:1}}).fetch(),
				category_list: Categorys.find({}, {sort:{name:1}}).fetch(),
				miniapp_details: MiniApps.findOne({_id:props.routeParams.miniAppId}, {})
			};
		

		
	}
	return { data: data };

})(MiniappsEditPage);

export class MiniappsEditPageEditForm extends Component {
	constructor () {
		super();

		this.state = {
			miniappsEditPageEditFormErrorMessage: "",
			miniappsEditPageEditFormInfoMessage: ""
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
				{this.state.miniappsEditPageEditFormErrorMessage}
			</div>
		);
	}

	renderInfoMessage() {
		return(
			<div className="alert alert-success">
				{this.state.miniappsEditPageEditFormInfoMessage}
			</div>
		);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ miniappsEditPageEditFormInfoMessage: "" });
		this.setState({ miniappsEditPageEditFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var miniappsEditPageEditFormMode = "update";
			if(!$("#miniapps-edit-page-edit-form").find("#form-cancel-button").length) {
				switch(miniappsEditPageEditFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ miniappsEditPageEditFormInfoMessage: message });
					}; break;
				}
			}

			FlowRouter.go("miniapps", objectUtils.mergeObjects(FlowRouter.current().params, {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ miniappsEditPageEditFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("miniAppsUpdate", self.props.data.miniapp_details._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	}

	onCancel(e) {
		e.preventDefault();
		self = this;
		

		FlowRouter.go("miniapps", objectUtils.mergeObjects(FlowRouter.current().params, {}));
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
			<div id="miniapps-edit-page-edit-form" className="">
				<h2 id="component-title">
					<span id="component-title-icon" className="">
					</span>
					Edit MiniApps
				</h2>
				<form role="form" onSubmit={this.onSubmit}>
					{this.state.miniappsEditPageEditFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.miniappsEditPageEditFormInfoMessage ? this.renderInfoMessage() : null}
								<div className="form-group  field-name">
									<label htmlFor="name">
										Name
									</label>
									<div className="input-div">
										<input type="text" name="name" defaultValue={this.props.data.miniapp_details.name} className="form-control " autoFocus="autoFocus" required="required" />
										<span id="help-text" className="help-block" />
										<span id="error-text" className="help-block" />
									</div>
								</div>
										<div className="form-group  field-description">
						<label htmlFor="description">
							Description
						</label>
						<div className="input-div">
							<input type="text" name="description" defaultValue={this.props.data.miniapp_details.description} className="form-control " required="required" />
							<span id="help-text" className="help-block" />
							<span id="error-text" className="help-block" />
						</div>
					</div>
					<div className="form-group  field-status">
						<label htmlFor="status">
							Status
						</label>
						<div className="input-div">
							<input type="text" name="status" defaultValue={this.props.data.miniapp_details.status} className="form-control " required="required" />
							<span id="help-text" className="help-block" />
							<span id="error-text" className="help-block" />
						</div>
					</div>
					<div className="form-group  field-platform-id">
						<label htmlFor="platformId">
							Platform
						</label>
						<div className="input-div">
							<select className="form-control " name="platformId" defaultValue={this.props.data.miniapp_details.platformId} required="required">
								{this.props.data.platform_list.map(function(item, index) { return(
								<option key={"dynamic-" + index} value={item._id}>									{item.name}</option>
								); }) }
							</select>
							<span id="help-text" className="help-block" />
							<span id="error-text" className="help-block" />
						</div>
					</div>
					<div className="form-group  field-category-id">
						<label htmlFor="categoryId">
							Category
						</label>
						<div className="input-div">
							<select className="form-control " name="categoryId" defaultValue={this.props.data.miniapp_details.categoryId} required="required">
								{this.props.data.category_list.map(function(item, index) { return(
								<option key={"dynamic-" + index} value={item._id}>									{item.name}</option>
								); }) }
							</select>
							<span id="help-text" className="help-block" />
							<span id="error-text" className="help-block" />
						</div>
					</div>
					<div className="form-group  field-path">
						<label htmlFor="path">
							Path
						</label>
						<div className="input-div">
							<input type="text" name="path" defaultValue={this.props.data.miniapp_details.path} className="form-control " required="required" />
							<span id="help-text" className="help-block" />
							<span id="error-text" className="help-block" />
						</div>
					</div>
					<div className="form-group  field-tag">
						<label htmlFor="tag">
							Tag
						</label>
						<div className="input-div">
							<input type="text" name="tag" defaultValue={this.props.data.miniapp_details.tag} className="form-control " required="required" />
							<span id="help-text" className="help-block" />
							<span id="error-text" className="help-block" />
						</div>
					</div>
					<div className="form-group  field-manifest-url">
						<label htmlFor="manifestUrl">
							Manifest Url
						</label>
						<div className="input-div">
							<input type="text" name="manifestUrl" defaultValue={this.props.data.miniapp_details.manifestUrl} className="form-control " required="required" />
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
