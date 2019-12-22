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
            checkBorrowerExists(val.cardNo)
        });
}

function checkBorrowerExists(cardNo) {
    connection.query('CALL BorrowerExists(?)', cardNo,
        function (err, res, fields) {
            if (err) throw err;

            if (res[0].length) {
                promptLoanMenu()
            }
            else {
                // If Borrower provides invalid CardNo, return to previous prompt
                start()
            }
        });
}

// BORR1:
function promptLoanMenu() {
    const choices = ['1) Check out a book', '2) Return a Book', '3) Quit to Previous (should take you menu MAIN)'];

    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            choices: choices
        }])
        .then(function (val) {
            switch (val.choice) {
                case choices[0]:
                    console.log('check out a book');
                    break;
                case choices[1]:
                    console.log('return a book');
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

exports.start = start;