const app = require('../app');

// const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

var connection;

// LIB1:
function start() {
    connection = app.connection;
    const choices = ['1) Enter Branch you manage', '2) Quit to previous'];
    inquirer
        .prompt([{
            type: "list",
            name: "choice",
            choices: choices
        }])
        .then(function (val) {
            if (val.choice === choices[0]) {
                showBranches();
            }
            // If user selects Quit to Previous, go back to previous menu
            else if (val.choice === choices[choices.length - 1]) {
                goBackTo(app.determineUser)
            }
            else {
                process.exit(0);
            }
        });
}

function goBackTo(func) {
    func();
}

// LIB2:
function showBranches() {
    connection.query("SELECT * FROM tbl_library_branch", function (err, res) {
        if (err) throw err;
        const results = addMenuText(res)

        promptBranchSelect(results);
    });
}

function addMenuText(results) {
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
            type: "list",
            name: "choice",
            choices: choices
        }])
        .then(function (val) {
            // If user selects Quit to Previous, go back to previous menu
            if (val.choice === choices[choices.length - 1]) {
                goBackTo(start)
            }
            else {
                const result = checkChoice(val.choice, results);
                promptBranchManagement(result)
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

// LIB3:
function promptBranchManagement(result) {
    let choices = [
        '1) Update the details of the Library',
        '2) Add copies of Book to the Branch',
        '3) Quit to previous'
    ];
    inquirer
        .prompt([{
            type: "list",
            name: "choice",
            choices: choices
        }])
        .then(function (val) {
            if (val.choice === choices[0]) {
                updateBranch(result);
            }
            else if (val.choice === choices[1]) {
                addCopies(result);
            }
            // If user selects Quit to Previous, go back to previous menu
            else if (val.choice === choices[choices.length - 1]) {
                goBackTo(showBranches)
            }
            else {
                process.exit(0);
            }
        });
}

function updateBranch(result) {
    console.log('updateBranch');
    
}

function addCopies(result) {
    console.log('addCopies');
}

exports.start = start;