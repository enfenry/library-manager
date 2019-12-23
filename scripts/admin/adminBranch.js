const app = require('../../app');
const admin = require('./admin');
const inquirer = require('inquirer');
var connection;
var utils;
var queries;

function start() {
    connection = app.connection;
    utils = require('../utils');
    queries = require('../queries');

    let choices = [
        '1) Add Branch',
        '2) Update Branch',
        '3) Delete Branch',
        '4) Quit to previous'
    ];

    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            choices: choices
        }])
        .then(function (val) {
            switch (val.choice) {
                case choices[0]:
                    // Add Branch
                    promptAddBranch();
                    break;
                case choices[1]:
                    // Update Branch
                    queries.showBranches(promptSelectBranch,true);
                    break;
                case choices[2]:
                    // Delete Branch
                    queries.showBranches(promptSelectBranch);
                    break;
                case choices[choices.length - 1]:
                    // If user selects Quit to Previous, go back to previous menu
                    admin.start();
                    break;
                default:
                    process.exit(0);
            };
        });
}

function promptAddBranch() {
    inquirer
        .prompt([{
            type: 'input',
            name: 'branchName',
            message: `You have chosen to add a branch. \n Enter ‘quit’ at any prompt to cancel operation. \n Please enter branch name:`,
            validate: function (input) {
                return input.trim().toLowerCase() !== 'n/a' && input.trim().toLowerCase() !== '';
            }
        }, {
            type: 'input',
            name: 'branchAddress',
            message: `Please enter branch address:`,
            validate: function (input) {
                return input.trim().toLowerCase() !== 'n/a' && input.trim().toLowerCase() !== '';
            }
        }])
        .then(function (val) {
            val.branchName = val.branchName.trim();
            val.branchAddress = val.branchAddress.trim();
            if (val.branchName.toLowerCase() === 'quit' || val.branchAddress.toLowerCase() === 'quit') {
                start();
            }
            else {
                addBranch(val);
            }
        });
}

function addBranch(val) {
    connection.query('CALL AddBranch(?,?)', [val.branchName, val.branchAddress],
        function (err, res, fields) {
            if (err) throw err;
            console.log('\n Successfully Added!');
            // Go back to previous menu
            promptAddBranch();
        });
}

function promptSelectBranch(branches, isUpdating) {
    let choices = utils.getChoiceList(branches);

    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            message: `Which branch would you like to ${isUpdating ? `Update` : `Delete`}?`,
            choices: choices
        }])
        .then(function (val) {
            // If user selects Quit to Previous, go back to previous menu
            if (val.choice === choices[choices.length - 1]) {
                start();
            }
            else {
                const branch = utils.checkChoice(val.choice, branches);
                if (isUpdating) {
                    promptUpdateBranch(branch);
                }
                else {
                    deleteBranch(branch);
                }
            }
        });
}

function promptUpdateBranch(branch) {
    inquirer
        .prompt([{
            type: 'input',
            name: 'branchName',
            message: `You have chosen to update a branch. \n Enter ‘quit’ at any prompt to cancel operation. \n Please enter new branch name or enter N/A for no change:`
        }, {
            type: 'input',
            name: 'branchAddress',
            message: `Please enter new branch address or enter N/A for no change:`
        }])
        .then(function (val) {
            val.branchName = val.branchName.trim();
            val.branchAddress = val.branchAddress.trim();
            if (val.branchName.toLowerCase() === 'quit' || val.branchAddress.toLowerCase() === 'quit') {
                start();
            }
            else {
                if (val.branchName.toLowerCase() !== 'n/a' && val.branchName.toLowerCase() !== '') {
                    branch.branchName = val.branchName;
                }
                if (val.branchAddress.toLowerCase() !== 'n/a' && val.branchAddress.toLowerCase() !== '') {
                    branch.branchAddress = val.branchAddress;
                }
                updateBranch(branch);
            }
        });
}

function updateBranch(branch) {
    connection.query('CALL UpdateBranch(?,?,?)', [branch.branchId, branch.branchName, branch.branchAddress],
        function (err, res, fields) {
            if (err) throw err;
            console.log('\n Successfully Updated!');
            // Go back to previous menu
            queries.showBranches(promptSelectBranch,true);
        });
}

function deleteBranch(branch) {
    connection.query('CALL DeleteBranch(?)', branch.branchId,
    function (err, res, fields) {
        if (err) throw err;
        console.log('\n Successfully Deleted!');
        // Go back to previous menu
        queries.showBranches(promptSelectBranch);
    });
}

exports.start = start;