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

    const choices = ['1) Enter Branch you manage', '2) Quit to previous'];
    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            choices: choices
        }])
        .then(function (val) {
            if (val.choice === choices[0]) {
                // LIB2:
                queries.showBranches(promptSelectBranch);
            }
            // If user selects Quit to Previous, go back to previous menu
            else if (val.choice === choices[choices.length - 1]) {
                app.determineUser();
            }
            else {
                process.exit(0);
            }
        });
}

function promptSelectBranch(branches) {
    // Prompts user for what branch they manage
    let choices = utils.getChoiceList(branches);

    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            choices: choices
        }])
        .then(function (val) {
            // If user selects Quit to Previous, go back to previous menu
            if (val.choice === choices[choices.length - 1]) {
                start();
            }
            else {
                const branch = utils.checkChoice(val.choice, branches);
                promptBranchManagement(branch)
            }
        });
}

// LIB3:
function promptBranchManagement(branch) {
    let choices = [
        '1) Update the details of the Library',
        '2) Add copies of Book to the Branch',
        '3) Quit to previous'
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
                    promptUpdateBranch(branch);
                    break;
                case choices[1]:
                    librarianRetrieveBooks(branch);
                    break;
                case choices[choices.length - 1]:
                    // If user selects Quit to Previous, go back to previous menu
                    queries.showBranches(promptSelectBranch);
                    break;
                default:
                    process.exit(0);
            };
        });
}

// LIB3 Option 1: prompt Librarian to update details of Library
function promptUpdateBranch(branch) {
    inquirer
        .prompt([{
            type: 'input',
            name: 'branchName',
            message: `You have chosen to update the Branch with Branch Id: ${branch.branchId} and Branch Name: ${branch.branchName}.\n Enter 'quit' at any prompt to cancel operation.\n Please enter new branch name or enter N/A for no change:`,
        }, {
            type: 'input',
            name: 'branchAddress',
            message: `Please enter new branch address or enter N/A for no change:`,
        }])
        .then(function (val) {
            val.branchName = val.branchName.trim();
            val.branchAddress = val.branchAddress.trim();
            if (val.branchName.toLowerCase() === 'quit' || val.branchAddress.toLowerCase() === 'quit') {
                promptBranchManagement(branch);
            }
            else {
                if (val.branchName.toLowerCase() !== 'n/a' && val.branchName.toLowerCase() !== '') {
                    branch.branchName = val.branchName
                }
                if (val.branchAddress.toLowerCase() !== 'n/a' && val.branchAddress.toLowerCase() !== '') {
                    branch.branchAddress = val.branchAddress
                }
                updateBranch(branch);
            }
        });
}

// Query database and Update details of branch
function updateBranch(branch) {
    connection.query('CALL UpdateBranch(?,?,?)', [branch.branchId, branch.branchName, branch.branchAddress],
        function (err, res, fields) {
            if (err) throw err;
            console.log('Successfully Updated!');
            // Go back to previous menu
            promptBranchManagement(branch)
        });
}

// LIB3 Option 2: retrieve Books at specific branch THEN prompt Librarian to add copies of a book
function librarianRetrieveBooks(branch) {
    connection.query('CALL LibrarianRetrieveBooks(?)', branch.branchId,
        function (err, res, fields) {
            if (err) throw err;
            const books = utils.addBookMenuText(res[0]);
            promptAddCopies(books, branch);
        });
}

function promptAddCopies(books, branch) {
    let choices = utils.getChoiceList(books);

    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            message: 'Pick the Book you want to add copies of, to your branch:',
            choices: choices
        }])
        .then(function (val) {
            // If user selects Quit to Previous, go back to previous menu
            if (val.choice === choices[choices.length - 1]) {
                promptBranchManagement(branch);
            }
            else {
                const res = utils.checkChoice(val.choice, books);

                inquirer
                    .prompt([{
                        type: 'input',
                        name: 'noOfCopies',
                        message: `Existing number of copies: ${res.noOfCopies}. \n Enter new number of copies:`,
                    }])
                    .then(function (val) {
                        res.noOfCopies = val.noOfCopies.trim();
                        librarianModBooks(res, branch);
                    })
            }
        });
}

function librarianModBooks(result, branch) {
    connection.query('CALL LibrarianModBooks(?,?,?)', [result.noOfCopies, result.bookId, branch.branchId],
        function (err, res, fields) {
            if (err) throw err;
            console.log('Successfully Updated!');
            // Go back to previous menu
            promptBranchManagement(branch);
        });
}

exports.start = start;