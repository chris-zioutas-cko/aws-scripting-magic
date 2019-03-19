'use strict';

const fs = require('fs')
let common = require('../lib/common.js');
const logger = require('../lib/logger.js');
const constants = require('../lib/constants.js');
let inputRequire = require("../lib/inputRequire.js");

const {
    convertArrayToCSV
} = require('convert-array-to-csv');

const department = "APM";
const awsService = "ECS";
const numberOfTasks = 1;
const applicationType = "API";
const dbAccess = "No (Aurora)";
const productService = "APM";
const category = "product-service";
const subCategory = "product-service internal";
const purpose = "APM Integration";
const eol = "N/A";
const additionalInfo = "Service needs to be able to connect to ach-dev Aurora RDS instance";

let header = ["Owner", "Department", "Cluster name", "AWS service", "Service name", "Task Definition", "Repos", "Number of tasks", "Application type", "Healthcheck endpoint", "Pathbase", "Database Access", "Product/Service", "Category", "Sub-category", "Purpose", "Provision start date", "Proposed end of life date", "Additional Information"];

let owner = inputRequire.value('owner', true, "Daniel Münch");
let product = inputRequire.value('product', true);


let table = [];

for (var ie in constants.ieArray) {

    let _ie = ieArray[ie];

    for (var env in constants.envArray) {

        let _env = envArray[env];

        let taskDefinition = product + "-" + _ie + "-" + _env;
        let taskDefinitionFilePath = common.taskDefinitionFilePath(product, _ie, _env);

        if (taskDefinitionFilePath == null || taskDefinitionFilePath.length == 0) {
            continue;
        }

        let taskDefinitionJson = common.getTaskDefinitionJson(taskDefinitionFilePath);

        let clusterName = "";
        if (_ie.indexOf("internal") > -1) {
            clusterName = constants.clustersInternal[_env];
        } else if (_ie.indexOf("external") > -1) {
            clusterName = constants.clustersExternal[_env];
        } else {
            logger.warn("Unkonwn cluster, must be internal or external");
        }

        let serviceName = taskDefinition;
        let dockerRepo = taskDefinitionJson.containerDefinitions[0].image;
        let pathBase = taskDefinitionJson.containerDefinitions[0].environment.find(o => o.name === 'PPRO_PathBase').value;
        let healthCheck = pathBase + "/_system/health";
        let date = common.prettyDateNow();

        // #TODO for console applications, set ApplicationType to Console instead of API
        if (_env == "prod") {
            table.push(createNewRow(owner, clusterName, dockerRepo, "blue-" + serviceName, taskDefinition, healthCheck, pathBase, date));
            table.push(createNewRow(owner, clusterName, dockerRepo, "green-" + serviceName, taskDefinition, healthCheck, pathBase, date));
        } else {
            table.push(createNewRow(owner, clusterName, dockerRepo, serviceName, taskDefinition, pathBase, date));
        }
    }
}

function createNewRow(owner, clusterName, dockerRepo, serviceName, taskDefinition, healthCheck, pathBase, date) {
    return [
        owner,
        department,
        clusterName,
        awsService,
        serviceName,
        taskDefinition,
        dockerRepo,
        numberOfTasks,
        applicationType,
        healthCheck,
        pathBase,
        dbAccess,
        productService,
        category,
        subCategory,
        purpose,
        date,
        eol,
        additionalInfo
    ]
}

const csvFromArrayOfArrays = convertArrayToCSV(table, {
    header
});

fs.writeFileSync("./output/cloud-tagging.csv", csvFromArrayOfArrays)

logger.info("CSV @ ./output/cloud-tagging.csv");