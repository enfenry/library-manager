const app = require('../app');
const inquirer = require('inquirer');
var connection;
var utils;
var queries;

// LIB1:
function start() {
    connection = app.connection;
    utils = require('./utils');
    queries = require('./queries');

    const choices = [
        '1) Add/Update/Delete Book and Author',
        '2) Add/Update/Delete Publishers',
        '3) Add/Update/Delete Library Branches',
        '4) Add/Update/Delete Borrowers',
        '5) Over-ride Due Date for a Book Loan',
        '6) Quit to previous'
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
                    // TODO:
                    // ADMIN1:
                    break;
                case choices[1]:
                    // TODO:
                    // ADMIN2:
                    break;
                case choices[2]:
                    // TODO:
                    // ADMIN3:
                    break;
                case choices[3]:
                    // TODO:
                    // ADMIN4:
                    promptAdminBorrower();
                    break;
                case choices[4]:
                    // TODO:
                    // ADMIN5:
                    break;
                case choices[choices.length - 1]:
                    // If user selects Quit to Previous, go back to previous menu
                    app.determineUser();
                    break;
                default:
                    process.exit(0);
            }
        });
}

// ADMIN4:
function promptAdminBorrower() {
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
                    // TODO:
                    promptAddBorrower()
                    break;
                case choices[1]:
                    // TODO:
                    // Update Borrower
                    break;
                case choices[2]:
                    // TODO:
                    // Delete Borrower
                    break;
                case choices[choices.length - 1]:
                    // If user selects Quit to Previous, go back to previous menu
                    start();
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
        },{
            type: 'input',
            name: 'phone',
            message: `Please enter borrower phone:`,
            validate: function (input) {
                return input.trim().toLowerCase() !== 'n/a' && input.trim().toLowerCase() !== '';
            }
        }
    ])
        .then(function (val) {
            val.name = val.name.trim();
            val.address = val.address.trim();
            val.phone = val.phone.trim();
            if (val.name.toLowerCase() === 'quit' || val.address.toLowerCase() === 'quit' || val.phone.toLowerCase() === 'quit') {
                promptAdminBorrower();
            }
            else {
                addBorrower(val.name, val.address,val.phone);
            }
        });
}

function addBorrower(name,address,phone){
        connection.query('CALL AddBorrower(?,?,?)', [name, address,phone],
            function (err, res, fields) {
                if (err) throw err;
                console.log('Successfully Added!');
                // Go back to previous menu
                promptAddBorrower();
            });
}

exports.start = start;