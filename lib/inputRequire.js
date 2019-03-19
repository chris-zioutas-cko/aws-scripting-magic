'use strict';

const logger = require('./logger.js');
const args = require('minimist')(process.argv.slice(2))

module.exports.value = function (parameterName, required, defaultValue) {
    if (required == undefined) {
        required = false;
    }

    let value = args[parameterName];
    
    if (required == true && value === undefined && defaultValue == undefined) {
        logger.error("Please pass a value using argument --" + parameterName + "=''");
        return;
    }

    if (defaultValue != undefined) {
        logger.info("(Default) Value for " + parameterName + ":" + defaultValue);
        return defaultValue;
    }

    logger.info("Value for " + parameterName + ":" + value);
    return value;
};