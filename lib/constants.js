'use strict';

var config = require('config');

let constants = {};

constants.ieArray = config.get("ie");
constants.envArray = config.get("env");
constants.clustersInternal = config.get("clustersInternal");
constants.clustersExternal = config.get("clustersExternal");

module.exports = constants;