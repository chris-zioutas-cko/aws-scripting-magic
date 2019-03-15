'use strict';

const fs = require('fs')
const logger = require('./logger.js');

module.exports.taskDefinitionFilePath = function (product, ie, env) {
    var family = product + "-" + ie + "-" + env;
    var filename = "./input/task-definition." + ie + "." + env + ".json";

    if (fs.existsSync(filename)) {
        logger.info(filename);
        return filename;
    } else {
        logger.warn("Warning, " + filename + " not found!");
        filename = "task-definition-template." + ie + ".json";
        logger.info("Using " + filename + " as default.");

        return;
    }
}

module.exports.getTaskDefinitionJson = function (path) {
    let rawdata = fs.readFileSync(path);
    return JSON.parse(rawdata);
}

module.exports.prettyDateNow = function () {
    return new Date().toISOString().
    replace(/T/, ' '). // replace T with a space
    replace(/\..+/, '') // delete the dot and everything after
}