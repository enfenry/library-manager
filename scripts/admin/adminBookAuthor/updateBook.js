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
            promptSelectBook(books);
        });
}

function promptSelectBook(books) {
    let choices = utils.getChoiceList(books);

    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            message: `Which book would you like to Update?`,
            choices: choices
        }])
        .then(function (val) {
            // If user selects Quit to Previous, go back to previous menu
            if (val.choice === choices[choices.length - 1]) {
                adminBookAuthor.start();
            }
            else {
                const book = utils.checkChoice(val.choice, books);
                queries.showPublishers(promptUpdateBook, book);
            }
        });
}

function promptUpdateBook(publishers, book) {
    let choices = utils.getChoiceList(publishers);

    inquirer
        .prompt([{
            type: 'input',
            name: 'title',
            message: `You have chosen to update a book. \n Enter ‘quit’ at any prompt to cancel operation. \n Please enter new book title or enter N/A for no change:`
        }, {
            type: 'list',
            name: 'choice',
            message: `Please select a publisher (formerly Id: ${book.pubId}).`,
            choices: choices
        }])
        .then(function (val) {
            val.title = val.title.trim();
            if (val.title.toLowerCase() === 'quit' || val.choice === choices[choices.length - 1]) {
                start();
            }
            else {
                if (val.title.toLowerCase() !== 'n/a' && val.title.toLowerCase() !== '') {
                    book.title = val.title;
                }
                const publisher = utils.checkChoice(val.choice, publishers);
                book.pubId = publisher.publisherId;

                updateBook(book);
            }
        });
}

function updateBook(book) {
    connection.query('CALL UpdateBook(?,?,?)', [book.bookId, book.title, book.pubId],
        function (err, res, fields) {
            if (err) throw err;
            console.log('\n Successfully Updated!');
            // Go back to previous menu
            adminRetrieveBooks();
        });
}

exports.start = start;