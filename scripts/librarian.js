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
            type: 'list',
            name: 'choice',
            choices: choices
        }])
        .then(function (val) {
            if (val.choice === choices[0]) {
                showBranches();
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

// LIB2:
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
            choices: choices
        }])
        .then(function (val) {
            // If user selects Quit to Previous, go back to previous menu
            if (val.choice === choices[choices.length - 1]) {
                start();
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
            type: 'list',
            name: 'choice',
            choices: choices
        }])
        .then(function (val) {
            if (val.choice === choices[0]) {
                promptBranchUpdate(result);
            }
            else if (val.choice === choices[1]) {
                librarianRetrieveBooks(result);
            }
            // If user selects Quit to Previous, go back to previous menu
            else if (val.choice === choices[choices.length - 1]) {
                showBranches()
            }
            else {
                process.exit(0);
            }
        });
}

// LIB3 Option 1: prompt Librarian to update details of Library
function promptBranchUpdate(result) {
    inquirer
    .prompt([{
        type: 'input',
        name: 'branchName',
        message: `You have chosen to update the Branch with Branch Id: ${result.branchId} and Branch Name: ${result.branchName}. 
        Enter 'quit' at any prompt to cancel operation.
        Please enter new branch name or enter N/A for no change:`,
    }])
    .then(function (val) {
        switch(val.branchName.toLowerCase()) {
            case 'quit':
                // If user selects quit, go back to previous menu
                promptBranchManagement(result);
            break;
            case 'n/a':
            case '':
                // CHANGE NOTHING
            break;
            default:
                result.branchName = val.branchName;
            break;
        }
        inquirer
        .prompt([{
            type: 'input',
            name: 'branchAddress',
            message: `Please enter new branch address or enter N/A for no change:`,
        }])
        .then(function(val) {
            switch(val.branchAddress.toLowerCase()) {
                case 'quit':
                    // If user selects quit, go back to previous menu
                    promptBranchManagement(result);
                break;
                case 'n/a':
                case '':
                    // CHANGE NOTHING
                break;
                default:
                    result.branchAddress = val.branchAddress;
                break;
            }
            updateBranch(result);
        });
    });
}

// Query database and Update details of branch
function updateBranch(result) {
        connection.query('CALL UpdateBranch(?,?,?)', [result.branchId, result.branchName, result.branchAddress],
        function (err, res, fields) {
            if (err) throw err;
            console.log('Successfully Updated!');
            // Go back to previous menu
            promptBranchManagement(result)
        });
}

// LIB3 Option 2: retrieve Books at specific branch THEN prompt Librarian to add copies of a book
function librarianRetrieveBooks(branch) {
    connection.query('CALL LibrarianRetrieveBooks(?)', branch.branchId,
    function (err, res, fields) {
        if (err) throw err;
            const results = addBooksMenuText(res[0])
            promptAddCopies(results,branch);
    });
}

function addBooksMenuText(results) {
    return results.map((result, index) => {
        result.menuText = `${index + 1}) ${result.title} by ${result.authorName}`;
        return result;
    })
}

function promptAddCopies(results,branch) {
    let choices = [];
    results.forEach(result => {
        choices.push(result.menuText);
    })
    choices.push(`${results.length}) Quit to previous`)

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
            promptBranchManagement(result);
        }
        else {
            const res = checkChoice(val.choice, results);
            
            inquirer
            .prompt([{
                type: 'input',
                name: 'noOfCopies',
                message: `Existing number of copies: ${res.noOfCopies} . 
                Enter new number of copies:`,
            }])
            .then(function (val) {
                res.noOfCopies = val.noOfCopies;
                librarianModBooks(res,branch);
            })
        }
    });
}

function librarianModBooks(result,branch) {
    connection.query('CALL LibrarianModBooks(?,?,?)', [result.noOfCopies, result.bookId, branch.branchId],
    function (err, res, fields) {
        if (err) throw err;
        console.log('Successfully Updated!');
        // Go back to previous menu
        promptBranchManagement(branch);
    });
}

exports.start = start;