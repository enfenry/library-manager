const app = require('../app');
const inquirer = require('inquirer');
var connection;

function start() {
    connection = app.connection;
}

exports.start = start;