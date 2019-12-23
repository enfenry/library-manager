const app = require('../../../app');
const adminBookAuthor = require('./adminBookAuthor');
const inquirer = require('inquirer');
var connection;
var utils;
var queries;

function start() {
    connection = app.connection;
    utils = require('../../utils');
    queries = require('../../queries');
    adminRetrieveBooks();
}

function adminRetrieveBooks() {
    connection.query('CALL AdminRetrieveBooks()',
        function (err, res, fields) {
            if (err) throw err;
            const books = utils.addBookMenuText(res[0]);
            promptSelectBook(books, true);
        });
}

function promptSelectBook(books) {
    let choices = utils.getChoiceList(books);

    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            message: `Which book would you like to Delete?`,
            choices: choices
        }])
        .then(function (val) {
            // If user selects Quit to Previous, go back to previous menu
            if (val.choice === choices[choices.length - 1]) {
                adminBookAuthor.start();
            }
            else {
                const book = utils.checkChoice(val.choice, books);
                deleteBnA(book);
            }
        });
}

function deleteBnA(book) {
    connection.query('CALL DeleteBnA(?,?)', [book.title, book.authorName],
        function (err, res, fields) {
            if (err) throw err;
            console.log('Successfully Deleted!');
            // Go back to previous menu
            adminRetrieveBooks();
        });
}

exports.start = start;