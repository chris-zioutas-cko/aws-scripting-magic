
'use strict';

const fs = require('fs')
let common = require('../lib/common.js');
const logger = require('../lib/logger.js');
const constants = require('../lib/constants.js');
const _ = require("underscore");
let inputRequire = require("../lib/inputRequire.js");

let product = inputRequire.value('product', true);
let owner = inputRequire.value('owner', true, "Daniel Münch");

_.each(constants.ieArray, function (_ie) {
    _.each(constants.envArray, function (_env) {

        if (_env === "prod") {
            common.registerTaskDefinition(product, _ie, _env, "eu-west-1");
        } else {
            common.registerTaskDefinition(product, _ie, _env, "eu-west-2");
        }
    });
})
