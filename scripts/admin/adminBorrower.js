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
        '1) Add Borrower',
        '2) Update Borrower',
        '3) Delete Borrower',
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
                    // Add Borrower
                    promptAddBorrower();
                    break;
                case choices[1]:
                    // Update Borrower
                    queries.showBorrowers(promptSelectBorrower,true);
                    break;
                case choices[2]:
                    // TODO:
                    // Delete Borrower
                    queries.showBorrowers(promptSelectBorrower);
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

function promptAddBorrower() {
    inquirer
        .prompt([{
            type: 'input',
            name: 'name',
            message: `You have chosen to add a borrower. \n Enter ‘quit’ at any prompt to cancel operation. \n Please enter borrower name:`,
            validate: function (input) {
                return input.trim().toLowerCase() !== 'n/a' && input.trim().toLowerCase() !== '';
            }
        }, {
            type: 'input',
            name: 'address',
            message: `Please enter borrower address:`,
            validate: function (input) {
                return input.trim().toLowerCase() !== 'n/a' && input.trim().toLowerCase() !== '';
            }
        }, {
            type: 'input',
            name: 'phone',
            message: `Please enter borrower phone:`,
            validate: function (input) {
                return input.trim().toLowerCase() !== 'n/a' && input.trim().toLowerCase() !== '';
            }
        }])
        .then(function (val) {
            val.name = val.name.trim();
            val.address = val.address.trim();
            val.phone = val.phone.trim();
            if (val.name.toLowerCase() === 'quit' || val.address.toLowerCase() === 'quit' || val.phone.toLowerCase() === 'quit') {
                start();
            }
            else {
                addBorrower(val);
            }
        });
}

function addBorrower(val) {
    connection.query('CALL AddBorrower(?,?,?)', [val.name, val.address, val.phone],
        function (err, res, fields) {
            if (err) throw err;
            console.log('Successfully Added!');
            // Go back to previous menu
            promptAddBorrower();
        });
}

function promptSelectBorrower(borrowers, isUpdating) {
    // Prompts user for what branch they manage
    let choices = utils.getChoiceList(borrowers);

    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            message: `Which borrower would you like to ${isUpdating ? `Update` : `Delete`}?`,
            choices: choices
        }])
        .then(function (val) {
            // If user selects Quit to Previous, go back to previous menu
            if (val.choice === choices[choices.length - 1]) {
                start();
            }
            else {
                const borrower = utils.checkChoice(val.choice, borrowers);
                if (isUpdating) {
                    promptUpdateBorrower(borrower);
                }
                else {
                    deleteBorrower(borrower);
                }
            }
        });
}

function promptUpdateBorrower(borrower) {
    inquirer
        .prompt([{
            type: 'input',
            name: 'name',
            message: `You have chosen to update a borrower. \n Enter ‘quit’ at any prompt to cancel operation. \n Please enter new borrower name or enter N/A for no change:`
        }, {
            type: 'input',
            name: 'address',
            message: `Please enter new borrower address or enter N/A for no change:`
        }, {
            type: 'input',
            name: 'phone',
            message: `Please enter new borrower phone or enter N/A for no change:`
        }])
        .then(function (val) {
            val.name = val.name.trim();
            val.address = val.address.trim();
            val.phone = val.phone.trim();
            if (val.name.toLowerCase() === 'quit' || val.address.toLowerCase() === 'quit' || val.phone.toLowerCase() === 'quit') {
                start();
            }
            else {
                if (val.name.toLowerCase() !== 'n/a' && val.name.toLowerCase() !== '') {
                    borrower.name = val.name;
                }
                if (val.address.toLowerCase() !== 'n/a' && val.address.toLowerCase() !== '') {
                    borrower.address = val.address;
                }
                if (val.phone.toLowerCase() !== 'n/a' && val.phone.toLowerCase() !== '') {
                    borrower.phone = val.phone;
                }
                updateBorrower(borrower);
            }
        });
}

function updateBorrower(borrower) {
    connection.query('CALL UpdateBorrower(?,?,?,?)', [borrower.cardNo, borrower.name, borrower.address, borrower.phone],
        function (err, res, fields) {
            if (err) throw err;
            console.log('Successfully Updated!');
            // Go back to previous menu
            queries.showBorrowers(promptSelectBorrower,true);
        });
}

function deleteBorrower(borrower) {
    connection.query('CALL DeleteBorrower(?)', borrower.cardNo,
    function (err, res, fields) {
        if (err) throw err;
        console.log('Successfully Deleted!');
        // Go back to previous menu
        queries.showBorrowers(promptSelectBorrower);
    });
}

exports.start = start;