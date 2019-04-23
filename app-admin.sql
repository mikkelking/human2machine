CREATE TABLE `miniApps`
(
  _id varchar(17) PRIMARY KEY,
  `name` varchar(255)  NOT NULL COMMENT 'Name',
  `description` varchar(255)  NOT NULL COMMENT 'Description',
  `status` varchar(255)  NOT NULL COMMENT 'Status',
  `platformId` varchar(17)  NOT NULL COMMENT 'Platform',
  `categoryId` varchar(17)  NOT NULL COMMENT 'Category',
  `path` varchar(255)  NOT NULL COMMENT 'Path',
  `tag` varchar(255)  NOT NULL COMMENT 'Tag',
  `manifestUrl` varchar(255)  NOT NULL COMMENT 'Manifest Url',
  `platform.name` varchar(255)   COMMENT 'Platform',
  `category.name` varchar(255)   COMMENT 'Category'
);


ALTER TABLE `miniApps` ADD FOREIGN KEY (`platformId`) REFERENCES `platforms` (`_id`);


ALTER TABLE `miniApps` ADD FOREIGN KEY (`categoryId`) REFERENCES `categorys` (`_id`);


CREATE TABLE `categorys`
(
  _id varchar(17) PRIMARY KEY,
  `name` varchar(255)  NOT NULL COMMENT 'Name',
  `description` varchar(255)  NOT NULL COMMENT 'Description'
);


CREATE TABLE `docs`
(
  _id varchar(17) PRIMARY KEY,
  `name` varchar(255)  NOT NULL COMMENT 'Name',
  `description` varchar(255)  NOT NULL COMMENT 'Description',
  `path` varchar(255)  NOT NULL COMMENT 'Path',
  `status` varchar(255)  NOT NULL COMMENT 'Status',
  `markdown` varchar(255)  NOT NULL COMMENT 'Markdown',
  `doctype` varchar(255)  NOT NULL COMMENT 'Doctype',
  `platformId` varchar(17)  NOT NULL COMMENT 'Platform',
  `miniAppId` varchar(17)  NOT NULL COMMENT 'Mini App',
  `platform.name` varchar(255)   COMMENT 'Platform',
  `miniapp.name` varchar(255)   COMMENT 'MiniApp'
);


ALTER TABLE `docs` ADD FOREIGN KEY (`platformId`) REFERENCES `platforms` (`_id`);


ALTER TABLE `docs` ADD FOREIGN KEY (`miniAppId`) REFERENCES `miniApps` (`_id`);


CREATE TABLE `platforms`
(
  _id varchar(17) PRIMARY KEY,
  `name` varchar(255)  NOT NULL COMMENT 'Name',
  `description` varchar(255)  NOT NULL COMMENT 'Description'
);


CREATE TABLE `deployments`
(
  _id varchar(17) PRIMARY KEY,
  `name` varchar(255)  NOT NULL COMMENT 'Name',
  `description` varchar(255)  NOT NULL COMMENT 'Description'
);


CREATE TABLE `eventlogs`
(
  _id varchar(17) PRIMARY KEY,
  `when` date  NOT NULL COMMENT 'When',
  `userId` varchar(17)  NOT NULL COMMENT 'User'
);


CREATE TABLE `reviews`
(
  _id varchar(17) PRIMARY KEY,
  `name` varchar(255)  NOT NULL COMMENT 'Name',
  `description` varchar(255)  NOT NULL COMMENT 'Description',
  `miniAppId` varchar(17)  NOT NULL COMMENT 'Mini App',
  `miniapp.name` varchar(255)   COMMENT 'MiniApp'
);


ALTER TABLE `reviews` ADD FOREIGN KEY (`miniAppId`) REFERENCES `miniApps` (`_id`);


CREATE TABLE `approvals`
(
  _id varchar(17) PRIMARY KEY,
  `name` varchar(255)  NOT NULL COMMENT 'Name',
  `description` varchar(255)  NOT NULL COMMENT 'Description',
  `miniAppId` varchar(17)  NOT NULL COMMENT 'Mini App',
  `miniapp.name` varchar(255)   COMMENT 'MiniApp'
);


ALTER TABLE `approvals` ADD FOREIGN KEY (`miniAppId`) REFERENCES `miniApps` (`_id`);


CREATE TABLE `tenancys`
(
  _id varchar(17) PRIMARY KEY,
  `name` varchar(255)  NOT NULL COMMENT 'Name',
  `description` varchar(255)  NOT NULL COMMENT 'Description',
  `platformId` varchar(17)  NOT NULL COMMENT 'Platform',
  `namespace` varchar(255)  NOT NULL COMMENT 'Namespace',
  `dafOrganisation` varchar(255)  NOT NULL COMMENT 'Daf Organisation',
  `myIdApproverEmail` varchar(255)  NOT NULL COMMENT 'My Id Approver Email',
  `remedyQueue` varchar(255)  NOT NULL COMMENT 'Remedy Queue'
);


CREATE TABLE `menus`
(
  _id varchar(17) PRIMARY KEY,
  `name` varchar(255)  NOT NULL COMMENT 'Name',
  `description` varchar(255)  NOT NULL COMMENT 'Description',
  `platformId` varchar(17)  NOT NULL COMMENT 'Platform',
  `platform.name` varchar(255)   COMMENT 'Platform'
);


ALTER TABLE `menus` ADD FOREIGN KEY (`platformId`) REFERENCES `platforms` (`_id`);


CREATE TABLE `menuItems`
(
  _id varchar(17) PRIMARY KEY,
  `name` varchar(255)  NOT NULL COMMENT 'Name',
  `description` varchar(255)  NOT NULL COMMENT 'Description',
  `menuId` varchar(17)  NOT NULL COMMENT 'Menu',
  `miniAppId` varchar(17)  NOT NULL COMMENT 'Mini App',
  `menu.name` varchar(255)   COMMENT 'Menu',
  `miniapp.name` varchar(255)   COMMENT 'MiniApp'
);


ALTER TABLE `menuItems` ADD FOREIGN KEY (`menuId`) REFERENCES `menus` (`_id`);


ALTER TABLE `menuItems` ADD FOREIGN KEY (`miniAppId`) REFERENCES `miniApps` (`_id`);


CREATE TABLE `versions`
(
  _id varchar(17) PRIMARY KEY,
  `name` varchar(255)  NOT NULL COMMENT 'Name',
  `description` varchar(255)  NOT NULL COMMENT 'Description',
  `version` varchar(255)  NOT NULL COMMENT 'Version',
  `status` varchar(255)  NOT NULL COMMENT 'Status'
);


CREATE TABLE `roles`
(
  _id varchar(17) PRIMARY KEY,
  `name` varchar(255)  NOT NULL COMMENT 'Name',
  `description` varchar(255)  NOT NULL COMMENT 'Description'
);


CREATE TABLE `permissions`
(
  _id varchar(17) PRIMARY KEY,
  `name` varchar(255)  NOT NULL COMMENT 'Name',
  `description` varchar(255)  NOT NULL COMMENT 'Description'
);


CREATE TABLE `profiles`
(
  _id varchar(17) PRIMARY KEY,
  `name` varchar(255)  NOT NULL COMMENT 'Name',
  `description` varchar(255)  NOT NULL COMMENT 'Description',
  `userId` varchar(17)  NOT NULL COMMENT 'User'
);


CREATE TABLE `stars`
(
  _id varchar(17) PRIMARY KEY,
  `who` varchar(255)  NOT NULL COMMENT 'Who',
  `userId` varchar(17)  NOT NULL COMMENT 'User',
  `when` date  NOT NULL COMMENT 'When',
  `docId` varchar(17)  NOT NULL COMMENT 'Doc',
  `doc.name` varchar(255)   COMMENT 'Doc'
);


ALTER TABLE `stars` ADD FOREIGN KEY (`docId`) REFERENCES `docs` (`_id`);


CREATE TABLE `comments`
(
  _id varchar(17) PRIMARY KEY,
  `who` varchar(255)  NOT NULL COMMENT 'Who',
  `userId` varchar(17)  NOT NULL COMMENT 'User',
  `when` date  NOT NULL COMMENT 'When',
  `comment` varchar(255)  NOT NULL COMMENT 'Comment',
  `docId` varchar(17)  NOT NULL COMMENT 'Doc',
  `doc.name` varchar(255)   COMMENT 'Doc'
);


ALTER TABLE `comments` ADD FOREIGN KEY (`docId`) REFERENCES `docs` (`_id`);