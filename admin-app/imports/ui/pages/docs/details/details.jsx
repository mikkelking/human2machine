import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {Docs} from "/imports/api/collections/both/docs.js";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";


export class DocsDetailsPage extends Component {
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
						<DocsDetailsPageDetailsForm data={this.props.data} routeParams={this.props.routeParams} />
					</div>
				</div>
			);
		}
	}
}

export const DocsDetailsPageContainer = withTracker(function(props) {



	let isReady = function() {
		

		let subs = [
			Meteor.subscribe("doc_details", props.routeParams.docId)
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

				doc_details: Docs.findOne({_id:props.routeParams.docId}, {})
			};
		

		
	}
	return { data: data };

})(DocsDetailsPage);

export class DocsDetailsPageDetailsForm extends Component {
	constructor () {
		super();

		this.state = {
			docsDetailsPageDetailsFormErrorMessage: "",
			docsDetailsPageDetailsFormInfoMessage: ""
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
				{this.state.docsDetailsPageDetailsFormErrorMessage}
			</div>
		);
	}

	renderInfoMessage() {
		return(
			<div className="alert alert-success">
				{this.state.docsDetailsPageDetailsFormInfoMessage}
			</div>
		);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ docsDetailsPageDetailsFormInfoMessage: "" });
		this.setState({ docsDetailsPageDetailsFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var docsDetailsPageDetailsFormMode = "read_only";
			if(!$("#docs-details-page-details-form").find("#form-cancel-button").length) {
				switch(docsDetailsPageDetailsFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ docsDetailsPageDetailsFormInfoMessage: message });
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ docsDetailsPageDetailsFormErrorMessage: message });
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

		FlowRouter.go("docs", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		FlowRouter.go("docs", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	

	

	render() {
		let self = this;
		return (
			<div id="docs-details-page-details-form" className="">
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
					{this.state.docsDetailsPageDetailsFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.docsDetailsPageDetailsFormInfoMessage ? this.renderInfoMessage() : null}
								<div className="form-group  field-name">
									<label htmlFor="name">
										Name
									</label>
									<div className="input-div">
										<p className="form-control-static  control-field-name">
											{this.props.data.doc_details.name}
										</p>
									</div>
								</div>
										<div className="form-group  field-description">
						<label htmlFor="description">
							Description
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-description">
								{this.props.data.doc_details.description}
							</p>
						</div>
					</div>
					<div className="form-group  field-path">
						<label htmlFor="path">
							Path
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-path">
								{this.props.data.doc_details.path}
							</p>
						</div>
					</div>
					<div className="form-group  field-status">
						<label htmlFor="status">
							Status
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-status">
								{this.props.data.doc_details.status}
							</p>
						</div>
					</div>
					<div className="form-group  field-markdown">
						<label htmlFor="markdown">
							Markdown
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-markdown">
								{this.props.data.doc_details.markdown}
							</p>
						</div>
					</div>
					<div className="form-group  field-doctype">
						<label htmlFor="doctype">
							Doctype
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-doctype">
								{this.props.data.doc_details.doctype}
							</p>
						</div>
					</div>
					<div className="form-group  field-platform-name">
						<label htmlFor="platform.name">
							Platform
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-platform-name">
								{this.props.data.doc_details.platform.name}
							</p>
						</div>
					</div>
					<div className="form-group  field-miniapp-name">
						<label htmlFor="miniapp.name">
							MiniApp
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-miniapp-name">
								{this.props.data.doc_details.miniapp.name}
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

