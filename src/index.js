#!/usr/bin/env node

'use strict';

var fs = require('fs');
var program = require('commander');
var parser = require('./lib/parser');

program
    .option('-p, --path <path>', 'Path of the properties file')
    .parse(process.argv);

var options = {};

if(program.path){
    var fileContent = fs.readFileSync(program.path);
    var config = JSON.parse(fileContent);
    if (config.src && config.dist) {
        parser.setOption(config);
    } else {
        console.error('Config file invalid. Expecting a JSON object with a src and dist attributes');
    }
} else {
    console.log('No config is set');
}

