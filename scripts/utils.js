const app = require('../app');
const inquirer = require('inquirer');
var connection;

exports.addBookMenuText = function(books) {
    return books.map((book, index) => {
        book.menuText = `${index + 1}) ${book.title} by ${book.authorName}`;
        return book;
    })
}

exports.addBranchMenuText = function(branches) {
    return branches.map((branch, index) => {
        branch.menuText = `${index + 1}) ${branch.branchName}, ${branch.branchAddress}`;
        return branch;
    })
}

exports.addLoanMenuText = function(loans) {
    return loans.map((loan, index) => {
        loan.menuText = `${index + 1}) ${loan.title}, ${loan.branchName}`;
        return loan;
    })
}

exports.getChoiceList = function(results) {
    let choices = [];
    results.forEach(result => {
        choices.push(result.menuText);
    })
    choices.push(`${results.length + 1}) Quit to previous`)
    return choices;
}

exports.checkChoice = function (choice, results) {
    for (let i = 0; i < results.length; i++) {
        if (choice === results[i].menuText) {
            return results[i];
        }
    }
    process.exit(0);
}