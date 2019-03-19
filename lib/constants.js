'use strict';

let constants = {};

constants.ieArray = ["internal-api", "external-api"];
constants.envArray = ["dev", "qa", "sandbox", "prod"];

constants.clustersInternal = {
    "dev": "apm-internal-dev",
    "qa": "gateway-internal-qa",
    "sandbox": "gateway-internal-sandbox",
    "prod": "gateway-internal-prod"
}

constants.clustersExternal = {
    "dev": "apm-external-dev",
    "qa": "gateway-external-qa",
    "sandbox": "gateway-external-sandbox",
    "prod": "gateway-external-prod"
}

module.exports = constants;