const app = require('../app');
const inquirer = require('inquirer');
var connection;

function start() {
    connection = app.connection;

    inquirer
        .prompt([{
            type: 'input',
            name: 'cardNo',
            message: 'Enter your Card Number:'
        }])
        .then(function (val) {
            // if (val.cardNo === choices[0]) {
            //     
            // }
            // // If user selects Quit to Previous, go back to previous menu
            // else if (val.choice === choices[choices.length - 1]) {
            //     app.determineUser();
            // }
            // else {
            //     process.exit(0);
            // }
        });
}

exports.start = start;