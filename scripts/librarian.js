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
                goBack(app.determineUser)
            }
            else {
                process.exit(0);
            }
        });
}


function goBack(func) {
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
        .prompt([
            {
                type: "list",
                name: "choice",
                choices: choices,
                validate: function (val) {
                    return !isNaN(val);
                }
            }
        ])
        .then(function (val) {
            // If user selects Quit to Previous, go back to previous menu
            if (val.choice === choices[choices.length - 1]) {
                goBack(start)
            }
            else if (val.choice === choices[0]) {
                // showBranches();
                console.log('TODO')

            }
            else {
                process.exit(0);
            }
        });
}

exports.start = start;