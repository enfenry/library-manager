const app = require('../app');

// const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

var connection;

module.exports = {
    // LIB1:
    start: function () {
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
                    enterBranch();
                }
                else if (val.choice === choices[choices.length - 1]) {
                    // const app = require('../app');
                    goBack(app.determineUser)
                }
                else {
                    process.exit(0);
                }
            });
    }
}

function goBack(func) {
    func();
}

function showBranches() {
    connection.query("SELECT * FROM tbl_library_branch", function (err, res) {
        if (err) throw err;

        const table = cTable.getTable(res);
        console.log(table);
    });
}

function enterBranch() {
    // Prompts user for what branch they manage
//     inquirer
//         .prompt([
//             {
//                 type: "input",
//                 name: "choice",
//                 message: "What is the ID of the branch you manage",
//                 validate: function (val) {
//                     return !isNaN(val) || val.toLowerCase() === "q";
//                 }
//             }
//         ])
//         .then(function (val) {

//             }
//         });
}

