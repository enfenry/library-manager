const app = require('../app');
const inquirer = require('inquirer');
var connection;

exports.addBooksMenuText = function(books) {
    return books.map((book, index) => {
        book.menuText = `${index + 1}) ${book.title} by ${book.authorName}`;
        return book;
    })
}

exports.addBranchMenuText = function(branches) {
    return branches.map((result, index) => {
        result.menuText = `${index + 1}) ${result.branchName}, ${result.branchAddress}`;
        return result;
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