#! /usr/bin/env node

var util = require('util');
var fs = require('fs');
var path = require('path');
var args = process.argv.slice(2);
var h2m = require('./parser.js');

if (args.length < 1) {
    console.log('Invalid arguments.');
    console.log('Please provide at least input file (output file is optional).');
    process.exit(1);
}

fs.readFile(args[0], { encoding: 'utf-8' }, function(err, data) {
    if (!err) {
        var [output, sql] = h2m.parse(data);

        if (args.length < 2) {
            console.log(JSON.stringify({ application: output }, null, 2));
        } else {
            fs.writeFile(args[1], JSON.stringify({ application: output }, null, 2), function(err) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                console.log('OK');
            });
            if (args.length === 3) {
                fs.writeFile(args[2], sql, function(err) {
                    if (err) {
                        console.log(err);
                        process.exit(1);
                    }
                    console.log('OK');
                });
            }
        }
    } else {
        console.log(err);
        process.exit(1);
    }
});
