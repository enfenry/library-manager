const app = require('../../app');
const adminBookAuthor = require('./adminBookAuthor/adminBookAuthor');
const adminPublisher = require('./adminPublisher');
const adminBranch = require('./adminBranch');
const adminBorrower = require('./adminBorrower');
const adminDueDate = require('./adminDueDate');
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
                    // ADMIN1: BOOKS AND AUTHORS
                    adminBookAuthor.start();
                    break;
                case choices[1]:
                    // ADMIN2: PUBLISHERS
                    adminPublisher.start();
                    break;
                case choices[2]:
                    // ADMIN3: BRANCHES
                    adminBranch.start();
                    break;
                case choices[3]:
                    // ADMIN4: BORROWERS
                    adminBorrower.start();
                    break;
                case choices[4]:
                    // ADMIN5: OVER-RIDE DUE DATE FOR BOOK LOAN
                    adminDueDate.start();
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