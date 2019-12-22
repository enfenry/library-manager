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
                    // Begin Book Checkout Process
                    showBranches();
                    break;
                case choices[1]:
                    // TODO:
                    // Begin Book Return Process
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

// BORR1 Option 1:
function showBranches() {
    connection.query('SELECT * FROM tbl_library_branch', function (err, res) {
        if (err) throw err;
        const results = addBranchMenuText(res)
        promptBranchSelect(results);
    });
}

function addBranchMenuText(results) {
    return results.map((result, index) => {
        result.menuText = `${index + 1}) ${result.branchName}, ${result.branchAddress}`;
        return result;
    })
}

function promptBranchSelect(results) {
    // Prompts user for what branch they manage
    let choices = [];
    results.forEach(result => {
        choices.push(result.menuText);
    })
    choices.push(`${results.length}) Quit to previous`)

    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            message: 'Pick the Branch you want to check out from:',
            choices: choices
        }])
        .then(function (val) {
            // If user selects Quit to Previous, go back to previous menu
            if (val.choice === choices[choices.length - 1]) {
                showBranches();
            }
            else {
                const result = checkChoice(val.choice, results);
                console.log(result);
            }
        });
}

function checkChoice(choice, results) {
    for (let i = 0; i < results.length; i++) {
        if (choice === results[i].menuText) {
            return results[i];
        }
    }
    process.exit(0);
}

exports.start = start;