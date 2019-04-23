import {MiniApps} from "/imports/api/collections/both/mini_apps.js";
import {Platforms} from "/imports/api/collections/both/platforms.js";
import {Categorys} from "/imports/api/collections/both/categorys.js";
import {Docs} from "/imports/api/collections/both/docs.js";
import {Reviews} from "/imports/api/collections/both/reviews.js";
import {Approvals} from "/imports/api/collections/both/approvals.js";
import {Menus} from "/imports/api/collections/both/menus.js";
import {MenuItems} from "/imports/api/collections/both/menu_items.js";
import {Stars} from "/imports/api/collections/both/stars.js";
import {Comments} from "/imports/api/collections/both/comments.js";

// MiniApps
MiniApps.join(Platforms, "platformId", "platform", ["name"]);
MiniApps.join(Categorys, "categoryId", "category", ["name"]);

// Docs
Docs.join(Platforms, "platformId", "platform", ["name"]);
Docs.join(MiniApps, "miniAppId", "miniapp", ["name"]);

// Reviews
Reviews.join(MiniApps, "miniAppId", "miniapp", ["name"]);

// Approvals
Approvals.join(MiniApps, "miniAppId", "miniapp", ["name"]);

// Menus
Menus.join(Platforms, "platformId", "platform", ["name"]);

// MenuItems
MenuItems.join(Menus, "menuId", "menu", ["name"]);
MenuItems.join(MiniApps, "miniAppId", "miniapp", ["name"]);

// Stars
Stars.join(Docs, "docId", "doc", ["name"]);

// Comments
Comments.join(Docs, "docId", "doc", ["name"]);

