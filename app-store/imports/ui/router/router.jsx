import React, { Component } from "react";
import PropTypes from "prop-types";
import {mount, withOptions} from "react-mounter";
import {LayoutContainer} from "/imports/ui/layouts/layout.jsx";
import {NotFound} from "/imports/ui/pages/not_found/not_found.jsx";
import {toKebabCase} from "/imports/modules/both/case_utils.js"
import {HomePublicPageContainer} from "/imports/ui/pages/home_public/home_public.jsx";
import {LoginPageContainer} from "/imports/ui/pages/login/login.jsx";
import {RegisterPageContainer} from "/imports/ui/pages/register/register.jsx";
import {ForgotPasswordPageContainer} from "/imports/ui/pages/forgot_password/forgot_password.jsx";
import {ResetPasswordPageContainer} from "/imports/ui/pages/reset_password/reset_password.jsx";
import {HomePrivatePageContainer} from "/imports/ui/pages/home_private/home_private.jsx";
import {AppsPageContainer} from "/imports/ui/pages/apps/apps.jsx";
import {AppsInsertPageContainer} from "/imports/ui/pages/apps/insert/insert.jsx";
import {AppsDetailsPageContainer} from "/imports/ui/pages/apps/details/details.jsx";
import {AppsEditPageContainer} from "/imports/ui/pages/apps/edit/edit.jsx";
import {DocsPageContainer} from "/imports/ui/pages/docs/docs.jsx";
import {DocsInsertPageContainer} from "/imports/ui/pages/docs/insert/insert.jsx";
import {DocsDetailsPageContainer} from "/imports/ui/pages/docs/details/details.jsx";
import {DocsEditPageContainer} from "/imports/ui/pages/docs/edit/edit.jsx";
import {PlatformsPageContainer} from "/imports/ui/pages/platforms/platforms.jsx";
import {PlatformsInsertPageContainer} from "/imports/ui/pages/platforms/insert/insert.jsx";
import {PlatformsDetailsPageContainer} from "/imports/ui/pages/platforms/details/details.jsx";
import {PlatformsEditPageContainer} from "/imports/ui/pages/platforms/edit/edit.jsx";
import {StarsPageContainer} from "/imports/ui/pages/stars/stars.jsx";
import {StarsInsertPageContainer} from "/imports/ui/pages/stars/insert/insert.jsx";
import {StarsDetailsPageContainer} from "/imports/ui/pages/stars/details/details.jsx";
import {StarsEditPageContainer} from "/imports/ui/pages/stars/edit/edit.jsx";
import {CommentsPageContainer} from "/imports/ui/pages/comments/comments.jsx";
import {CommentsInsertPageContainer} from "/imports/ui/pages/comments/insert/insert.jsx";
import {CommentsDetailsPageContainer} from "/imports/ui/pages/comments/details/details.jsx";
import {CommentsEditPageContainer} from "/imports/ui/pages/comments/edit/edit.jsx";
/*IMPORTS*/

const reactMount = withOptions({
	rootProps: {
		className: "react-root"
	}
}, mount);

// Wait user data to arrive
FlowRouter.wait();

// subscribe to user data
var userDataSubscription = Meteor.subscribe("current_user_data");

Tracker.autorun(function() {
	if(userDataSubscription.ready() && !FlowRouter._initialized) {
		// user data arrived, start router
		FlowRouter.initialize();
	}
});


Tracker.autorun(function() {
	var userId = Meteor.userId();
	var user = Meteor.user();
	if(userId && !user) {
		return;
	}

	var currentContext = FlowRouter.current();
	var route = currentContext.route;
	if(route) {
		if(user) {
			if(route.group.name == "public") {
				FlowRouter.reload();
			}
		} else {
			if(route.group.name == "private") {
				FlowRouter.reload();
			}
		}
	}
});

const publicRouteNames = [
	"home_public",
	"login",
	"register",
	"forgot_password",
	"reset_password"
];

const privateRouteNames = [
	"home_private",
	"apps",
	"apps.insert",
	"apps.details",
	"apps.edit",
	"docs",
	"docs.insert",
	"docs.details",
	"docs.edit",
	"platforms",
	"platforms.insert",
	"platforms.details",
	"platforms.edit",
	"stars",
	"stars.insert",
	"stars.details",
	"stars.edit",
	"comments",
	"comments.insert",
	"comments.details",
	"comments.edit"
];

const freeRouteNames = [
	
];

const roleMap = [
	
];

const firstGrantedRoute = function(preferredRoute) {
	if(preferredRoute && routeGranted(preferredRoute)) return preferredRoute;

	var grantedRoute = "";

	_.every(privateRouteNames, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(publicRouteNames, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(freeRouteNames, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	if(!grantedRoute) {
		console.log("All routes are restricted for current user.");
		return "notFound";
	}

	return "";
};

// this function returns true if user is in role allowed to access given route
export const routeGranted = function(routeName) {
	if(!routeName) {
		// route without name - enable access (?)
		return true;
	}

	if(!roleMap || roleMap.length === 0) {
		// this app doesn't have role map - enable access
		return true;
	}

	var roleMapItem = _.find(roleMap, function(roleItem) { return roleItem.route == routeName; });
	if(!roleMapItem) {
		// page is not restricted
		return true;
	}

	// if user data not arrived yet, allow route - user will be redirected anyway after his data arrive
	if(Meteor.userId() && !Meteor.user()) {
		return true;
	}

	if(!Meteor.user() || !Meteor.user().roles) {
		// user is not logged in or doesn't have "role" member
		return false;
	}

	// this page is restricted to some role(s), check if user is in one of allowedRoles
	var allowedRoles = roleMapItem.roles;
	var granted = _.intersection(allowedRoles, Meteor.user().roles);
	if(!granted || granted.length === 0) {
		return false;
	}

	return true;
};


FlowRouter.triggers.enter(function(context) {
	if(context.route && context.route.name) {
		$("body").addClass("page-" + toKebabCase(context.route.name));
	}

	Session.set("CurrentPageTitle", context.route && context.route.options ? context.route.options.title || "" : "");
});

FlowRouter.triggers.exit(function(context) {
	if(context.route && context.route.name) {
		$("body").removeClass("page-" + toKebabCase(context.route.name));
	}
});


FlowRouter.subscriptions = function() {
	this.register("current_user_data", Meteor.subscribe("current_user_data"));
};


const freeRoutes = FlowRouter.group({
	name: "free",
	triggersEnter: [
		function(context, redirect, stop) {
			if(!routeGranted(context.route.name)) {
				// user is not in allowedRoles - redirect to first granted route
				var redirectRoute = firstGrantedRoute("");
				redirect(redirectRoute);
			}
		}
	]
});

const publicRoutes = FlowRouter.group({
	name: "public",
	triggersEnter: [
		function(context, redirect, stop) {
			if(Meteor.user()) {
				var redirectRoute = firstGrantedRoute("home_private");
				redirect(redirectRoute);
			}
		}
	]
});

const privateRoutes = FlowRouter.group({
	name: "private",
	triggersEnter: [
		function(context, redirect, stop) {
			if(!Meteor.user()) {
				// user is not logged in - redirect to public home
				var redirectRoute = firstGrantedRoute("home_public");
				redirect(redirectRoute);
			} else {
				// user is logged in - check role
				if(!routeGranted(context.route.name)) {
					// user is not in allowedRoles - redirect to first granted route
					var redirectRoute = firstGrantedRoute("home_private");
					redirect(redirectRoute);
				}
			}
		}
	]
});

FlowRouter.notFound = {
	action () {
		reactMount(LayoutContainer, {
			content: (<NotFound />)
		});
	}
};

publicRoutes.route("/", {
    name: "home_public",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<HomePublicPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

publicRoutes.route("/login", {
    name: "login",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<LoginPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

publicRoutes.route("/register", {
    name: "register",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<RegisterPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

publicRoutes.route("/forgot_password", {
    name: "forgot_password",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<ForgotPasswordPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

publicRoutes.route("/reset_password/:resetPasswordToken", {
    name: "reset_password",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<ResetPasswordPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/home_private", {
    name: "home_private",

    title: "Welcome {{userFullName}}!",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<HomePrivatePageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/apps", {
    name: "apps",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<AppsPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/apps/insert", {
    name: "apps.insert",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<AppsInsertPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/apps/details/:appId", {
    name: "apps.details",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<AppsDetailsPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/apps/edit/:appId", {
    name: "apps.edit",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<AppsEditPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/docs", {
    name: "docs",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<DocsPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/docs/insert", {
    name: "docs.insert",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<DocsInsertPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/docs/details/:docId", {
    name: "docs.details",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<DocsDetailsPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/docs/edit/:docId", {
    name: "docs.edit",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<DocsEditPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/platforms", {
    name: "platforms",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<PlatformsPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/platforms/insert", {
    name: "platforms.insert",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<PlatformsInsertPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/platforms/details/:platformId", {
    name: "platforms.details",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<PlatformsDetailsPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/platforms/edit/:platformId", {
    name: "platforms.edit",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<PlatformsEditPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/stars", {
    name: "stars",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<StarsPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/stars/insert", {
    name: "stars.insert",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<StarsInsertPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/stars/details/:starId", {
    name: "stars.details",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<StarsDetailsPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/stars/edit/:starId", {
    name: "stars.edit",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<StarsEditPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/comments", {
    name: "comments",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<CommentsPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/comments/insert", {
    name: "comments.insert",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<CommentsInsertPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/comments/details/:commentId", {
    name: "comments.details",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<CommentsDetailsPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});

privateRoutes.route("/comments/edit/:commentId", {
    name: "comments.edit",

    title: "",

	triggersEnter: [
		function(context, redirect, stop) {
			
		}
	],
    action: function(routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
			content: (
				<CommentsEditPageContainer routeParams={routeParams} />
			)
		});

    },
	triggersExit: [
		function(context, redirect) {
			
		}
	]
});
