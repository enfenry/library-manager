const app = require('../app');
const inquirer = require('inquirer');
var connection;

exports.addBookMenuText = function(books) {
    return books.map((book, index) => {
        book.menuText = `${index + 1}) ${book.title} by ${book.authorName}`;
        return book;
    })
}

exports.addPublisherMenuText = function(publishers) {
    return publishers.map((publisher, index) => {
        publisher.menuText = `${index + 1}) ${publisher.publisherName}, ${publisher.publisherAddress}`;
        return publisher;
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

exports.addBorrowerMenuText = function(borrowers) {
    return borrowers.map((borrower, index) => {
        borrower.menuText = `${index + 1}) ${borrower.cardNo}, ${borrower.name}`;
        return borrower;
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