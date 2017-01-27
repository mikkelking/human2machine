if(typeof require != "undefined") _ = require("underscore");

human2machine = function(input) {
  var output = {
    application: {
      collections: [],
      queries: [],

      free_zone: {
        pages: [],
        components: [
          {
            name: "main_menu",
            type: "menu",
            class: "nav navbar-nav",
            items: [
            ]
          }
        ]
      },
      packages: { meteor: [], npm: [] }
    }
  };

var getOutputPage = function(pageName) {
  return _.find(output.application.free_zone.pages, function(page) { return page.name == pageName; });
};

var getOutputCollection = function(collectionName) {
  return _.find(output.application.collections, function(collection) { return collection.name == collectionName; });
};

  var getOutputQuery = function(queryName) {
    return _.find(output.application.queries, function(query) { return query.name == queryName; });
  };

  var numbers = {
      'one': 1,
      'two': 2,
      'three': 3,
      'four': 4,
      'five': 5,
      'six': 6,
      'seven': 7,
      'eight': 8,
      'nine': 9,
      'ten': 10,
      'eleven': 11,
      'twelve': 12,
      'thirteen': 13,
      'fourteen': 14,
      'fifteen': 15,
      'sixteen': 16,
      'seventeen': 17,
      'eighteen': 18,
      'nineteen': 19,
      'twenty': 20
  };

  var findSubString = function(str, subStr) {
    return str.search(new RegExp(subStr, "i"));
  };

  var escapeRegExp = function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  };

  var splitStr = function(str, char) {
    var ch = escapeRegExp(char);
    var res = str.match(new RegExp('(?!' + ch + '|$)[^' + ch + '"]*(("[^"]*")[^' + ch + '"]*)*', 'g'));
    return res || [];
  };

  var equal = function(str1, str2) {
    if(str1 && str2) return str1.toUpperCase() == str2.toUpperCase();

    return str1 == str2;
  };

  var getListAfterSubstring = function(str, subStr1, subStr2) {
    var subStr = "";
    var index = findSubString(str, subStr1);
    if(index < 0) {
      index = findSubString(str, subStr2);
      if(index < 0) {
        return [];
      } else {
        subStr = subStr2;
      }
    } else {
      subStr = subStr1;
    }

    str = str.slice(index + subStr.length).trim();

    var list = splitStr(str.replace(" and ", ", ").replace(" & ", ", "), ",");

    var res = [];
    _.each(list, function(l) {
        res.push(l.trim().replace(/\W+\s/g, ''));
    });
    return res;
  };

  var findWord = function(str, word) {
    var words = splitStr(str, " ");
    var index = -1;
    _.find(words, function(w, i) { if(w == word) { index = i; return true; } else return false; });
    return index;
  };

  var getRestAfterWord = function(str, word) {
    var res = "";
    var index = findSubString(str, word);
    if(index < 0) {
    } else {
      res = str.substring(index + word.length + 1)
    }
    return res;
  };

  var getWordAfterWord = function(str, word) {
    var res = "";
    var words = splitStr(str, " ");
    _.each(words, function(w, i) {
        if(equal(w, word) && words[i + 1]) res = words[i + 1];
    });
    return res;
  };

  var getWordBeforeWord = function(str, word) {
      var res = "";
      var words = splitStr(str, " ");
      _.each(words, function(w, i) {
          if(equal(w, word) && words[i - 1]) res = words[i - 1];
      });
      return res;
  };

  var getWordBetweenWords = function(str, word1, word2) {
      var res = "";
      var words = splitStr(str, " ");
      _.each(words, function(w, i) {
          w = w.trim();
          var w1 = words[i - 1] || "";
          var w2 = words[i + 1] || "";
          if(i && equal(w1.trim(), word1.trim()) && equal(w2.trim(), word2.trim())) res = words[i];
      });
      return res;
  };

  var getQuotedStringAfterSubString = function(str, subStr) {
    var index = findSubString(str, subStr);
    if(index < 0) return "";

    str = str.slice(index + subStr.length).trim();
    var m = str.match( /"(.*?)"/ );//str.match(/[^"]+(?=(" ")|"$)/g);
    if(!m) return "";
    return m[1];
  };

  var toTitleCase = function(s) {
    var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

    return s.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
      if (index > 0 && index + match.length !== title.length &&
        match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
        (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
        title.charAt(index - 1).search(/[^\s-]/) < 0) {
        return match.toLowerCase();
      }

      if (match.substr(1).search(/[A-Z]|\../) > -1) {
        return match;
      }

      return match.charAt(0).toUpperCase() + match.substr(1);
    });
  };

  var getListOf = function(sentence, singular, plural) {
    var list = [];

    for(var num in numbers) {
      sentence = sentence.replace(num, numbers[num]);
    }

    var words = splitStr(sentence, " ");
    var count = 0;
    _.each(words, function(word, i) {
      var nextWord = words[i + 1];
      if(parseInt(word) && (equal(nextWord, singular) || equal(nextWord, plural) || equal(nextWord, singular + ":") || equal(nextWord, plural + ":")))
        count = parseInt(word);

      if(equal(word, singular + ":") || equal(word, plural + ":")) {
        var items = getListAfterSubstring(sentence, singular + ":", plural + ":");

        _.each(items, function(item) {
            list.push(item.toLowerCase());
        });
      }
    });

    if(!list.length && count) {
      for(var i = 0; i < count; i++) {
          list.push(singular + i);
      }
    }
    return list;
  };

  var createPages = function(sentence) {
    var pageNames = getListOf(sentence, "page", "pages");
    if(!pageNames.length) return;

    output.application.free_zone.pages = [];

    _.each(pageNames, function(pageName) {
        if(pageName == "page0") pageName = "home";
        var name = pageName.replace(" ", "_").replace("-", "_");
        var title = toTitleCase(pageName);

        output.application.free_zone.pages.push({
            name: name,
            title: title,
            pages: [],
            components: []
        });

        output.application.free_zone.components[0].items.push({
            title: title,
            route: name
        });
    });
  };

  var createCollections = function(sentence) {
    var collectionNames = getListOf(sentence, "collection", "collections");
    if(!collectionNames.length) return;

    output.application.collections = [];

    _.each(collectionNames, function(collectionName) {
        var name = collectionName.replace(" ", "_").replace("-", "_");

        output.application.collections.push({
            name: name,
            joins: [],
            fields: []
        });
    });
  };

  var addFieldsToCollection = function(sentence) {
    var collectionName = getWordBetweenWords(sentence, "in", "collection");
    if(!collectionName) return;

    var collection = getOutputCollection(collectionName);
    if(!collection) return;

    var fields = getListOf(sentence, "field", "fields");
    if(!fields.length) return;

    _.each(fields, function(field) {
      var name = field.replace(" ", "_").replace("-", "_");
      var title = toTitleCase(field);
      collection.fields.push({
        name: name,
        title: title
      });
    });
  };

  var lookupCollections = function(sentence) {
// when editing sales lookup customers using Customer Id
    var coll1name = getWordBetweenWords(sentence, "editing", "lookup");
    if(!coll1name) return;

    var collection1 = getOutputCollection(coll1name);
    if(!collection1) return;

    var coll2name = getWordBetweenWords(sentence, "lookup", "using");
    if(!coll2name) return;

    var collection2 = getOutputCollection(coll2name);
    if(!collection2) return;

    var fieldname = getRestAfterWord(sentence, "using");
    if(!fieldname) return;

    var fieldname = fieldname.replace(" ", "_").replace("-", "_").toLowerCase();
    _.each(collection1.fields, function(field) {
      if (field.name === fieldname) {
		field.required = true;
		field.input = "select";
		field.lookup_query = {
			name: coll2name,
			collection: coll2name,
			filter: {}
			};
		field.lookup_field = "name";
		field.lookup_key = fieldname;
		field.show_in_dataview = false;
		field.show_in_read_only_form = false;

	  }
	});
  };

  var connectCollectionToMosquitto = function(sentence) {
    var collectionName = getWordBetweenWords(sentence, "connect", "collection");
    var collection = getOutputCollection(collectionName);

    if(!collection) return;

    if(findWord(sentence, "mosquitto") < 0) return;

    var url = getQuotedStringAfterSubString(sentence, "server:");
    if(!url) return;

    if(findSubString(url, "//") < 0) url = "mqtt://" + url;

    var topics = getListAfterSubstring(sentence, "topic:", "topics:");

    var startupCode = output.application.server_startup_code || "";
    var top = "";
    _.each(topics, function(t) {
        if(top) top = top + ", ";
        top = top + "'" + t + "'";
    });
    startupCode = startupCode + toTitleCase(collectionName) + ".mqttConnect('" + url + "', [" + top + "]);";
    output.application.server_startup_code = startupCode;

    output.application.packages = output.application.packages || {};
    output.application.packages.meteor = output.application.packages.meteor || [];
    if(output.application.packages.meteor.indexOf("perak:mqtt-collection") < 0) output.application.packages.meteor.push("perak:mqtt-collection");
  };

  var addJumbotronToPage = function(sentence, page) {
    var title = getQuotedStringAfterSubString(sentence, "title:");
    var text = getQuotedStringAfterSubString(sentence, "text:");
    var buttonRoute = getQuotedStringAfterSubString(sentence, "url:");
    if(!getOutputPage(buttonRoute)) buttonRoute = "";

    var buttonTitle = buttonRoute ? "Continue" : "";
    var jumbotron = {
      name: "jumbotron",
      type: "jumbotron",
      text: text,
      button_route: buttonRoute,
      button_title: buttonTitle,
      title: title
    };
    page.components.push(jumbotron);
    page.title = "";
  };

  var addDataviewToPage = function(sentence, page) {
    var collectionName = getWordBetweenWords(sentence, "for", "collection");
    if(!collectionName || !getOutputCollection(collectionName)) {
      collectionName = getWordBetweenWords(sentence, "showing", "collection");
      if(!getOutputCollection(collectionName)) {
        return;
      }
    }

    var queryName = collectionName;
    var query = getOutputQuery(queryName);
    if(!query) {
      query = {
        name: queryName,
        collection: collectionName,
        filter: {},
        options: {}
      };
      
      output.application.queries.push(query);
    }

    var dataView = {
      name: "list",
      type: "dataview",
      query_name: queryName
    };

    page.components.push(dataView);
  };

  var addCrudToPage = function(sentence, page) {
    var collectionName = getWordBetweenWords(sentence, "for", "collection");
    if(!getOutputCollection(collectionName)) return;

    var viewQueryName = collectionName;
    var viewQuery = getOutputQuery(viewQueryName);
    if(!viewQuery) {
      viewQuery = {
        name: viewQueryName,
        collection: collectionName,
        filter: {},
        options: {}
      };
      
      output.application.queries.push(viewQuery);
    }

    var insertQueryName = collectionName + "_empty";
    var insertQuery = getOutputQuery(insertQueryName);
    if(!insertQuery) {
      insertQuery = {
        name: insertQueryName,
        collection: collectionName,
        filter: { _id: null },
        options: {},
        find_one: true
      };
      
      output.application.queries.push(insertQuery);
    }

    var editQueryName = collectionName + "_selected";
    var editQuery = getOutputQuery(editQueryName);
    if(!editQuery) {
      editQuery = {
        name: editQueryName,
        collection: collectionName,
        filter: { _id: ":customerId" },
        options: {},
        find_one: true
      };
      
      output.application.queries.push(editQuery);
    }

    var dataView = {
      name: "list",
      type: "dataview",
      query_name: viewQueryName,
      insert_route: page.name + ".insert",
      edit_route: page.name + ".edit",
      edit_route_params: [{ name: "customerId", value: "this._id" }]
    };

    var insertPage = {
        name: "insert",
        components: []
    };

    var insertForm = {
      name: "form",
      type: "form",
      mode: "insert",
      title: "Insert",
      query_name: insertQueryName,
      submit_route: page.name,
      cancel_route: page.name
    };
    insertPage.components.push(insertForm);

    var editPage = {
        name: "edit",
        route_params: ["customerId"],
        components: []
    };

    var editForm = {
      name: "form",
      type: "form",
      mode: "update",
      title: "Edit",
      query_name: editQueryName,
      submit_route: page.name,
      cancel_route: page.name
    };
    editPage.components.push(editForm);

    page.components.push(dataView);
    page.pages.push(insertPage);
    page.pages.push(editPage);
  };

  var addPhotoblogToPage = function(sentence, page) {
    var collectionName = getWordBetweenWords(sentence, "in", "collection");
    if(!collectionName) {
      var collectionName = getWordBetweenWords(sentence, "into", "collection");
    }
    if(!getOutputCollection(collectionName)) return;

    var viewQueryName = collectionName;
    var viewQuery = getOutputQuery(viewQueryName);
    if(!viewQuery) {
      viewQuery = {
        name: viewQueryName,
        collection: collectionName,
        filter: {},
        options: { sort: { createdAt: -1 } }
      };
      
      output.application.queries.push(viewQuery);
    }

    var photoBlog = {
            name: "photo_blog",
            type: "custom_component",
            html: "<template name=\"TEMPLATE_NAME\">\n\t<p style=\"margin: 20px 0;\">\n\t\t<button type=\"button\" id=\"take-photo\" class=\"btn btn-danger\">\n\t\t\t<span class=\"fa fa-camera\"></span>\n\t\t\tTake a photo and share it!\n\t\t</button>\n\t</p>\n\n  \t<form>\n\t\t<div class=\"form-group\">\n\t\t\t<label for=\"text\">Or enter a note</label>\n\t\t\t<textarea class=\"form-control\" name=\"text\" rows=\"3\"></textarea>\n\t\t</div>\n\t\t<button type=\"submit\" class=\"btn btn-success\">Send</button>\n\t</form>\n  \n\t{{#each QUERY_VAR}}\n\t\t<div class=\"panel\" style=\"padding: 0 10px;\">\n\t\t\t{{#if photo}}\n\t\t\t\t<img src=\"{{photo}}\" alt=\"Loading image...\" style=\"margin-top: 10px; width: 100%; height: auto\">\n\t\t\t{{else}}\n\t\t\t\t<p>{{text}}</p>\n\t\t\t{{/if}}\n\t\t\t<p class=\"text-muted\">{{name}}, {{livestamp createdAt}}</p>\n\t\t</div>\n\t{{/each}}\n</template>\n",
              js: "var cameraOptions = {\n\twidth: 800,\n\theight: 600\n};\n\n\nTemplate.TEMPLATE_NAME.events({\n\t\"submit form\": function(e, t) {\n\t\te.preventDefault();\n\t\tvar textArea = $(e.currentTarget).find(\"textarea\");\n\t\tif(!textArea.val()) {\n\t\t\treturn;\n\t\t}\n\t\tCOLLECTION_VAR.insert({\n\t\t\ttext: textArea.val()\n\t\t}, function(e, r) {\n\t\t\tif(e) {\n\t\t\t\talert(e);\n\t\t\t\treturn;\n\t\t\t}\n\t\t\ttextArea.val(\"\");\n\t\t});\n\t},\n\n\t\"click #take-photo\": function(e, t) {\n\t\tMeteorCamera.getPicture(cameraOptions, function (error, data) {\n\t\t\tif (error) {\n\t\t\t\tconsole.log(error.message);\n\t\t\t} else {\n\t\t\t\tCOLLECTION_VAR.insert({\n\t\t\t\t\tphoto: data\n\t\t\t\t});\n\t\t\t}\n\t\t});\n\t}\n});\n",
      query_name: viewQueryName
    }

    page.components.push(photoBlog);

    if(output.application.packages.meteor.indexOf("mdg:camera") < 0) {
      output.application.packages.meteor.push("mdg:camera");
    }

  };

  var addComponentsToPage = function(sentence) {
      var pageName = getWordBetweenWords(sentence, "in", "page");
      if(!pageName) return;
      var page = getOutputPage(pageName);
      if(!page) {
        if(pageName == "home") page = getOutputPage("home_page");
        if(!page) return;
      }

      // which component?
      if(findSubString(sentence, "jumbotron") >= 0) {
          addJumbotronToPage(sentence, page);
      } else {
        if(findSubString(sentence, "table") >= 0) {
            addDataviewToPage(sentence, page);
        } else {
          if(findSubString(sentence, "crud") >= 0) {
              addCrudToPage(sentence, page);
          } else {
            if(findSubString(sentence, "photo blog") >= 0) {
                addPhotoblogToPage(sentence, page);
            } else {
              if(findSubString(sentence, "text") >= 0) {
                  page.text = getQuotedStringAfterSubString(sentence, "text");
              }
            }
          }
        }
      }
  };

  var sentences = splitStr(input, ".").filter(function(e) { return e; });
  _.each(sentences, function(sentence) {
    createCollections(sentence);
    addFieldsToCollection(sentence);
    lookupCollections(sentence);
    connectCollectionToMosquitto(sentence);
    createPages(sentence);
    addComponentsToPage(sentence);
  });
  return output;
}

exports = exports || {};
exports.human2machine = human2machine;
