// recruit-parser.js
//
// Parser for Meteor Kitchen
//
const templates = require("./app-template");
const fs = require("fs");
const _ = require("lodash");
const titleCase = require("title-case");
const camelCase = require("camel-case");

const PARSER_SUMMARIES = {
  E: "Errors",
  W: "Warnings",
  I: "Information",
  F: "Fatal"
};

const myTitleCase = value => {
  return titleCase(value).replace(/ Id$/, "");
};
const debug = require("debug")("kitchen:parser");

var logUtil = function(severity) {
  return function(message, context) {
    debug(severity, message, context);
    return { severity, message, context };
  };
};

var logFatal = logUtil("F");
var logError = logUtil("E");
var logWarn = logUtil("W");
var logInfo = logUtil("I");

const when = new Date();
let errs = [];
let section;
const app = {
  current: {},
  parts: {},
  when
};
//
// add singular/Plural forms of collection name to replacer object
const addLC = (obj, kvs) => {
  Object.keys(kvs).forEach(key => {
    const value = kvs[key];
    obj[key] = value;
    obj[`LC_${key}`] = value.toLowerCase();
    obj[`LC1_${key}`] = value.toLowerCase().replace(/s$/i, "");
    obj[`1_${key}`] = value.replace(/s$/i, "");
  });
  return obj;
};
//
// Recursive method to replace tokens in json object
// Parameters:
//             incoming object to scan and replace
//             newValue: object of values to replace
//
const objectReplace = (incoming, newValues) => {
  if (incoming) {
    if (typeof incoming === "string") {
      const m = incoming.match(/<(\w+)>/);
      if (m && newValues[m[1]]) {
        incoming = incoming.replace(`<${m[1]}>`, newValues[m[1]]);
      }
    }
    if (typeof incoming === "object") {
      const newObject = _.clone(incoming);
      if (newObject.isArray) {
        return newObject[element].map(e => {
          return objectReplace(e, newValues);
        });
      } else {
        Object.keys(incoming).forEach(element => {
          newObject[element] = objectReplace(newObject[element], newValues);
        });
        return newObject;
      }
    }
  }
  return incoming; // No change for other object types (bool, number etc)
};

const parseMenu = menuItem => {
  if ((m = menuItem.match(/\s*(\w+)\s*\(private\)/i))) {
    return { name: m[1], private: true };
  }
  return { name: menuItem, private: false };
};

const newSection = function(title, directive) {
  debug("newSection", title);
  const words = title.split(/:/);
  const name = words[0].toLowerCase().trim();
  if (!app.parts[name]) {
    app.parts[name] = {
      items: []
    };
  }
  section = app.parts[name];
  words.forEach((word, i) => {
    if (i) {
      section[word.toLowerCase().trim()] = true;
    }
  });
  app.current.object = section;
  app.current.context = name;
};

const newItem = function(value) {
  if (!app.current.object) {
    return logError(`Found an item [${value}] out of place`);
  }
  const context = app.current.context;
  if (context && contextActions[context]) {
    item = contextActions[context](value);
    if (item) {
      app.current.object.items.push(item);
    }
  } else {
    app.current.object.items.push(value);
  }
};

const directives = {
  main: {
    regex: /^(\S+)/i,
    action: newSection
  }
};

const items = {
  item: {
    regex: /^\s+(.*?)$/i,
    action: newItem
  }
};
const contextActions = {
  menu: parseMenu
};

const checkError = (line, err) => {
  if (err) {
    errs.push({ line, ...err });
  }
};

const makeRecipe = (appData, t) => {
  const recipe = _.cloneDeep(t.application);
  // Collections...
  const {
    collections,
    joins = [],
    accounts,
    menu,
    packages,
    public,
    private,
    popups,
    templates
  } = appData.parts;
  // Packages
  packages.items.forEach(pkg => {
    if (pkg.match(":")) recipe.packages.meteor.push(pkg);
    else recipe.packages.npm.push(pkg);
  });
  // Public pages
  public.items.forEach(page => {
    recipe.public_zone.pages.forEach(p => {
      if (p.name === "home_public") {
        const [original, title, description] = page.match(
          /\s*(\w+):\s*Jumbotron:\s*(.*)$/
        );
        p.components[0].title = title;
        p.components[0].text = description;
      }
    });
  });
  // Private pages
  private.items.forEach(page => {
    // Example:   Schemas: CRUD: Schemas
    const [original, pageName, collectionName] = page.match(
      /(\w+):\s*CRUD:\s*(.*)$/
    );
    const replacers = addLC({ PAGE: pageName }, { COLLECTION: collectionName });

    recipe.private_zone.pages.push(objectReplace(t.crud, replacers));
    recipe.private_zone.components[0].items.push({
      title: collectionName,
      route: collectionName.toLowerCase()
    });
  });

  const fkeys = {};
  debug("Joins", joins);
  joins.items.forEach(j => {
    const [original, src, fkey, target] = j.match(/^(\w+)\.(\w+):\s*(.*)$/i);
    fkeys[src] = fkeys[src] || [];
    fkeys[src].push({ fkey, target });
  });
  collections.items.forEach(c => {
    const newC = _.cloneDeep(t.collection);
    const [original, tableName, flist] = c.match(/^(\w+):(.*)$/i);
    const extraFields = [];
    newC.fields = flist
      .split(",")
      .map(f => f.trim())
      .map(f => f.replace(/\s+/, "_"))
      .map(f => {
        let field = {
          name: f,
          title: myTitleCase(f),
          required: true,
          exportable: true
        };
        if (fkeys[tableName])
          fkeys[tableName].forEach(item => {
            if (item.fkey === f) {
              const replacers = addLC(
                {},
                {
                  COLLECTION: tableName,
                  JOINCOLLECTION: item.target
                }
              );
              const extras = objectReplace(t.fkeys, replacers);
              field = Object.assign(field, extras);
              // Do we need a display field to match the foreign key?
              const extraField = objectReplace(
                t.fkeyDisplay,
                addLC({}, { FOREIGNTABLE: item.target })
              );
              extraFields.push(extraField);
            }
          });
        return field;
      });
    newC.fields = newC.fields.concat(extraFields);
    newC.name = camelCase(tableName);
    recipe.collections.push(newC);
    const newQ = t.queries.map(q => {
      return objectReplace(
        q,
        addLC(
          {},
          {
            COLLECTION: tableName
          }
        )
      );
    });
    recipe.queries = recipe.queries.concat(newQ);
  });
  return recipe;
};

const parse = data => {
  errs = [];
  const lines = data.split(/\n/);

  // Iterate over the lines in the file
  lines.forEach((l, ix) => {
    let done = false;
    const line = l.replace(/\s+$/gm, "");
    const lineNo = ix + 1;
    debug(`${lineNo}: ${l}`);
    // Skip comments
    if (line.match(/^\s*#/)) {
      done = true;
    }
    if (!done) {
      // Look for directives:
      Object.keys(directives).forEach(d => {
        const directive = directives[d];
        const match = line.match(directive.regex);
        if (match) {
          done = true;
          if (directive.action) {
            debug("Calling action method for " + `${match[1]}`);
            checkError(lineNo, directive.action(`${match[1]}`, directive));
          }
        }
      });
    }
    if (!done) {
      Object.keys(items).forEach(d => {
        const item = items[d];
        const match = line.match(item.regex);
        if (match) {
          done = true;
          if (item.action) {
            debug("Calling action method for " + `${match[1]}`);
            checkError(lineNo, item.action(`${match[1]}`));
          }
        }
      });
    }
  });
  // Remove working data inside app structure
  delete app.current;
  const errorData = {
    errors: errs,
    errorCount: 0,
    summary: {}
  };
  // Calculate a summary of each category
  errorData.errors.forEach(error => {
    const code = PARSER_SUMMARIES[error.severity];
    errorData.summary[code] = errorData.summary[code]
      ? errorData.summary[code] + 1
      : 1;
    if (["E", "F"].includes(error.severity)) {
      errorData.errorCount = errorData.errorCount + 1;
    }
  });
  Object.values(PARSER_SUMMARIES).forEach(code => {
    if (!errorData.summary[code]) {
      errorData.summary[code] = 0;
    }
  });
  if (debug.enabled) {
    fs.writeFile(
      "./parsed.json",
      JSON.stringify({ errorData, app }, null, 2),
      function(err) {
        if (err) {
          console.log(err);
          process.exit(1);
        }
        console.log("Saved parsed file");
      }
    );
  }
  return makeRecipe(app, templates);
};

exports = exports || {};
exports.parse = parse;
