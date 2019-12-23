const app = require('../app');
const inquirer = require('inquirer');
var connection;
var utils;
var queries;

function start() {
    connection = app.connection;
    utils = require('./utils');
    queries = require('./queries');

    inquirer
        .prompt([{
            type: 'input',
            name: 'cardNo',
            message: 'Enter your Card Number:'
        }])
        .then(function (val) {
            checkBorrowerExists(val.cardNo.trim());
        });
}

function checkBorrowerExists(cardNo) {
    connection.query('CALL BorrowerExists(?)', cardNo,
        function (err, res, fields) {
            if (err) throw err;
            if (res[0].length) {
                promptLoanMenu(cardNo);
            }
            else {
                // If Borrower provides invalid CardNo, return to previous prompt
                start();
            }
        });
}

// BORR1:
function promptLoanMenu(cardNo) {
    const choices = ['1) Check out a book', '2) Return a Book', '3) Quit to Previous'];

    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            choices: choices
        }])
        .then(function (val) {
            switch (val.choice) {
                case choices[0]:
                    // Begin Book Checkout Process BORR1 Option 1:
                    // execute showBranches then promptBranchSelect function
                    queries.showBranches(promptBranchSelect, cardNo);
                    break;
                case choices[1]:
                    // TODO:
                    // Begin Book Return Process BORR1 Option 2
                    selectLoans(cardNo);
                    break;
                case choices[choices.length - 1]:
                    // If user selects Quit to Previous, go back to previous menu
                    app.determineUser();
                    break;
                default:
                    process.exit(0);
            };
        });
}

// BORR1 Option 1
function promptBranchSelect(branches, cardNo) {
    // Prompts user for what branch they manage
    let choices = utils.getChoiceList(branches);

    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            message: `Pick the Branch you want to check out from:`,
            choices: choices
        }])
        .then(function (val) {
            // If user selects Quit to Previous, go back to previous menu
            if (val.choice === choices[choices.length - 1]) {
                promptLoanMenu(cardNo);
            }
            else {
                const branch = utils.checkChoice(val.choice, branches);
                borrowerRetrieveBooks(branch, cardNo);
            }
        });
}

function borrowerRetrieveBooks(branch, cardNo) {
    connection.query('CALL BorrowerRetrieveBooks(?)', branch.branchId,
        function (err, res, fields) {
            if (err) throw err;
            const books = utils.addBookMenuText(res[0]);
            promptBookSelect(books, branch, cardNo);
        });
}

function promptBookSelect(books, branch, cardNo) {
    let choices = utils.getChoiceList(books);

    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            message: 'Pick the Book you want to check out:',
            choices: choices
        }])
        .then(function (val) {
            if (val.choice === choices[choices.length - 1]) {
                promptLoanMenu(cardNo);
            }
            else {
                const book = utils.checkChoice(val.choice, books);
                addLoan(book, books, branch, cardNo)
            }
        })
}

function addLoan(book, books, branch, cardNo) {
    connection.query('CALL AddLoan(?,?,?)', [book.bookId, branch.branchId, cardNo],
        function (err, res, fields) {
            if (err) throw err;
            console.log('\n Successfully Updated!');
            // Go back to previous menu
            promptBookSelect(books, branch, cardNo)
        });
}

// BORR1 Option 2
function selectLoans(cardNo) {
    connection.query('CALL SelectLoans(?)', cardNo,
        function (err, res, fields) {
            if (err) throw err;
            
            const loans = utils.addLoanMenuText(res[0]);
            promptLoanSelect(loans,cardNo);
        });
}

function promptLoanSelect(loans,cardNo) {
    let choices = utils.getChoiceList(loans);
    // console.log('choices',choices);
    inquirer
    .prompt([{
        type: 'list',
        name: 'choice',
        message: 'Pick the Book you want to return:',
        choices: choices
    }])
    .then(function (val) {
        if (val.choice === choices[choices.length - 1]) {
            promptLoanMenu(cardNo);
        }
        else {
            const loan = utils.checkChoice(val.choice, loans);
            deleteLoan(loan,cardNo);
        }
    })
}

function deleteLoan(loan,cardNo) {
    connection.query('CALL DeleteLoan(?,?,?)', [loan.bookId, loan.branchId, cardNo],
    function (err, res, fields) {
        if (err) throw err;
        
        console.log('\n Successfully returned!')
        selectLoans(cardNo);
    });
}

exports.start = start;