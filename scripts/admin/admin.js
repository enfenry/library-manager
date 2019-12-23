const app = require('../../app');
const adminBranch = require('./adminBranch');
const adminBorrower = require('./adminBorrower');
const inquirer = require('inquirer');

function start() {
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
                    // ADMIN1: BOOKS AND AUTHORS
                    break;
                case choices[1]:
                    // TODO:
                    // ADMIN2: PUBLISHERS
                    break;
                case choices[2]:
                    // ADMIN3: BRANCHES
                    adminBranch.start();
                    break;
                case choices[3]:
                    // TODO:
                    // ADMIN4: BORROWERS
                    adminBorrower.start();
                    break;
                case choices[4]:
                    // TODO:
                    // ADMIN5: OVER-RIDE DUE DATE FOR BOOK LOAN
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

exports.start = start;