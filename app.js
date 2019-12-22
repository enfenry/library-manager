const librarian = require('./scripts/librarian');
const admin = require('./scripts/admin');
const borrower = require('./scripts/borrower');
const inquirer = require('inquirer');
const connection = require('./config').connection;

connection.connect(function (err) {
    if (err) throw err;
    exports.connection = connection;
    determineUser();
});

function determineUser() {
    const choices = ['1) Librarian', '2) Administrator', '3) Borrower'];
    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            message: 'Welcome to the GCIT Library Management System. Which category of a user are you?',
            choices: choices
        }])
        .then(function (val) {
            // Checking to see what option the user chose and running the appropriate function
            if (val.choice === choices[0]) {
                librarian.start();
            }
            else if (val.choice === choices[1]) {
                admin.start();
            }
            else if (val.choice === choices[2]) {
                borrower.start();
            }
            else {
                process.exit(0);
            }
        });
}

exports.determineUser = determineUser;
