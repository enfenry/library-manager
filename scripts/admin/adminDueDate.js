const app = require('../../app');
const admin = require('./admin');
const inquirer = require('inquirer');
var connection;
var utils;
var queries;
var moment = require('moment');
moment().format();

// Over-ride Loan dueDate
function start() {
    connection = app.connection;
    utils = require('../utils');
    queries = require('../queries');

    queries.showBorrowers(promptSelectBorrower);
}

function promptSelectBorrower(borrowers) {
    let choices = utils.getChoiceList(borrowers);

    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            message: `Select a borrower to see their loans.`,
            choices: choices
        }])
        .then(function (val) {
            // If user selects Quit to Previous, go back to previous menu
            if (val.choice === choices[choices.length - 1]) {
                admin.start();
            }
            else {
                const borrower = utils.checkChoice(val.choice, borrowers);
                showLoans(borrower.cardNo);
            }
        });
}

function showLoans(cardNo) {
    connection.query('CALL SelectLoans(?)', cardNo,
        function (err, res, fields) {
            if (err) throw err;
            const loans = utils.addLoanMenuText(res[0]);
            promptSelectLoan(loans)
        });
}

function promptSelectLoan(loans) {
    // Prompts user for what branch they manage
    let choices = utils.getChoiceList(loans);

    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            message: `Select a loan to adjust due date.`,
            choices: choices
        }])
        .then(function (val) {
            // If user selects Quit to Previous, go back to previous menu
            if (val.choice === choices[choices.length - 1]) {
                start();
            }
            else {
                const loan = utils.checkChoice(val.choice, loans);
                    promptUpdateDueDate(loan);
            }
        });
}

function promptUpdateDueDate(loan) {
    inquirer
        .prompt([{
            type: 'input',
            name: 'dueDate',
            message: `You have chosen to update a due date. \n Enter ‘quit’ to cancel operation. \n Please enter new date (YYYY-MM-DD):`
        }])
        .then(function (val) {
            val.dueDate = val.dueDate.trim();
            if (val.dueDate.toLowerCase() === 'quit') {
                start();
            }
            else {
                var dateTime = moment(val.dueDate);

                if (dateTime.isValid()) {
                    loan.dueDate = dateTime._d;
                    updateDueDate(loan);
                }
                else {
                    promptUpdateDueDate(loan)
                }
            }
        });
}

function updateDueDate(loan) {
    connection.query('CALL UpdateDueDate(?,?,?,?)', [loan.bookId, loan.branchId, loan.cardNo, loan.dueDate],
        function (err, res, fields) {
            if (err) throw err;
            console.log('Successfully Updated!');
            // Go back to previous menu
            showLoans(loan.cardNo);
        });
}

exports.start = start;