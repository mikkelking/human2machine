// recruit-parser.js
//
// Parser for Meteor Kitchen
//
const PARSER_SUMMARIES = {
  E: "Errors",
  W: "Warnings",
  I: "Information",
  F: "Fatal",
}

const debug = require('debug')('kitchen:parser')

var logUtil = function(severity) {
  return function(message,context) {
    debug(severity, message, context)
    return({ severity, message, context })
  }
}

var logFatal = logUtil("F")
var logError = logUtil("E")
var logWarn = logUtil("W")
var logInfo = logUtil("I")

const when = new Date()
let errs = []
let app = {
  current: {},
  parts: {},
  when,
}
let section

const parseMenu = (menuItem) => {
  if (m = menuItem.match(/\s*(\w+)\s*\(private\)/i)) {
    return { name: m[1], private: true }
  }
  return { name: menuItem, private: false }
}
const newSection = function (title, directive) {
  debug("newSection", title)
  const words = title.split(/:/)
  const name = words[0].toLowerCase().trim()
  if (!app.parts[name]) {
    app.parts[name] = {
      items: []
    }
  }
  section = app.parts[name]
  words.forEach((word, i) => {
    if (i) {
      section[word.toLowerCase().trim()] = true
    }
  })
  app.current.object = section
  app.current.context = name
}

const newItem = function (value, ) {
  if (!app.current.object) {
    return logError(`Found an item [${value}] out of place`)
  }
  const context = app.current.context
  if (context && contextActions[context]) {
    item = contextActions[context](value)
    if (item) {
      app.current.object.items.push(item)
    }
  } else {
    app.current.object.items.push(value)
  }
}

const directives = {
  main: {
    regex: /^(\S+)/i,
    action: newSection,
  },
}

const items = {
  item: {
    regex: /^\s+(.*?)$/i,
    action: newItem,
  },
}
const contextActions = {
  menu: parseMenu
}

const checkError = (line, err) => {
  if (err) {
    errs.push({line, ...err})
  }
}

const parse = (data) => {
  errs = []
  const lines = data.split(/\n/)

// Iterate over the lines in the file
  lines.forEach((l, ix) => {
    let done = false
    const line = l.replace(/\s+$/gm,'');
    const lineNo = ix + 1
    debug(`${lineNo}: ${l}`)
    // Skip comments
    if (line.match(/^\s*#/)) {
      done = true
    }
    if (!done) {
        // Look for directives:
      Object.keys(directives).forEach((d) => {
        const directive = directives[d]
        const match = line.match(directive.regex)
        if (match) {
          done = true
          if (directive.action) {
            debug("Calling action method for " + `${match[1]}`)
            checkError(lineNo, directive.action(`${match[1]}`,directive))
          }
        }
      })
    }
    if (!done) {
      Object.keys(items).forEach((d) => {
        const item = items[d]
        const match = line.match(item.regex)
        if (match) {
          done = true
          if (item.action) {
            debug("Calling action method for " + `${match[1]}`)
            checkError(lineNo, item.action(`${match[1]}`))
          }
        }
      })
    }
  })
	// Remove working data inside app structure
  delete app.current
  const errorData = {
    errors: errs,
    errorCount: 0,
    summary: {},
  }
  // Calculate a summary of each category
  errorData.errors.forEach((error) => {
    const code = PARSER_SUMMARIES[error.severity]
    errorData.summary[code] = (errorData.summary[code])
      ? errorData.summary[code] + 1
      : 1
    if (["E","F"].includes(error.severity)) {
      errorData.errorCount = errorData.errorCount + 1
    }
  })
  Object.values(PARSER_SUMMARIES).forEach(code => {
    if (!errorData.summary[code]) {
      errorData.summary[code] = 0
    }
  })
  return { errorData, app }
}

exports = exports || {};
exports.parse = parse;
