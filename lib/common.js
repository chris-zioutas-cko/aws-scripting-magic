'use strict';

const fs = require('fs')
const logger = require('./logger.js');
const constants = require('./constants.js');
const _ = require("underscore");

module.exports.taskDefinitionFilePath = function (product, ie, env) {
    var family = product + "-" + ie + "-" + env;
    var _filename = "./input/task-definition." + ie + "." + env + ".json";

    if (fs.existsSync(_filename)) {
        logger.info(_filename);
        return _filename;
    } else {
        logger.warn("Warning, " + _filename + " not found!");
        _filename = "task-definition-template." + ie + ".json";
        logger.info("Using " + _filename + " as default.");

        return;
    }
}

module.exports.registerTaskDefinition = function (product, ie, env, region) {
    let _product = product;
    let _ie = ie;
    let _env = env;
    let _region = region;
    let _family = _product + "-" + _ie + "-" + _env;
    let _filename = "task-definition." + _ie + "." + _env + ".json";

    let  taskRoleArn="arn:aws:iam::679045690091:role/ach-ecs-task-role-$env";

    if (!fs.existsSync(_filename)) {
        logger.warn("Warning, " + _filename + " not found!");
        _filename = "task-definition-template." + ie + ".json";
        logger.info("Using " + _filename + " as default.");

        return;
    }

    // aws ecs register-task-definition \
    //     --family $family \
    //     --task-role-arn $taskRoleArn \
    //     --region $region \
    //     --cli-input-json file://./$filename

    for (var ie in constants.ieArray) {

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