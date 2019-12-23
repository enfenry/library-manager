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
    queries.showPublishers(promptSelectPublisher);
}

function promptSelectPublisher(publishers) {
    let choices = utils.getChoiceList(publishers);

    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            message: `You have chosen to add a book. \n Which publisher does this new book belong to?`,
            choices: choices
        }])
        .then(function (val) {
            // If user selects Quit to Previous, go back to previous menu
            if (val.choice === choices[choices.length - 1]) {
                adminBookAuthor.start();
            }
            else {
                const publisher = utils.checkChoice(val.choice, publishers);
                promptAddBook(publisher, publishers);
            }
        });
}

function promptAddBook(publisher, publishers) {
    inquirer
        .prompt([{
            type: 'input',
            name: 'title',
            message: `You have chosen to add a book. \n Enter ‘quit’ to cancel operation. \n Please enter book title:`,
            validate: function (input) {
                return input.trim().toLowerCase() !== 'n/a' && input.trim().toLowerCase() !== '';
            }
        }])
        .then(function (val) {
            val.title = val.title.trim();
            val.pubId = publisher.publisherId;
            if (val.title.toLowerCase() === 'quit') {
                start();
            }
            else {
                addBook(val, publishers);
            }
        });
}

function addBook(book, publishers) {
    connection.query('CALL AddBook(?,?)', [book.title, book.pubId],
        function (err, res, fields) {
            if (err) throw err;
            console.log('\n Successfully Added!');

            connection.query('SELECT MAX(b.bookId) AS bookId FROM tbl_book b',
                function (err, res, fields) {
                    if (err) throw err;

                    // Once book added, begin prompting to add Authors
                    queries.showAuthors(promptSelectBookAuthors, [res[0].bookId, publishers ]);
                });

        });
}

function promptSelectBookAuthors(authors, [bookId,publishers]) {
    let bookAuthors = [];
    let choices = utils.getAuthorChoiceList(authors);

    function promptAddAuthor() {
        inquirer
            .prompt([{
                type: 'input',
                name: 'authorName',
                message: `Enter an author name: \n`,
                validate: function (input) {
                    return input.trim().toLowerCase() !== 'n/a' && input.trim().toLowerCase() !== '';
                }
            }])
            .then(function (val) {
                val.authorName = val.authorName.trim();
                console.log('bookId', bookId);
                addAuthor(val.authorName, bookId)
            });
    }

    function addAuthor(authorName, bookId) {
        connection.query('CALL AddAuthor(?,?)', [authorName, bookId],
            function (err, res, fields) {
                if (err) throw err;
                console.log('\n Successfully Added Author!');
                promptLoop();
            });
    };

    function addABTrans(bookId,authorId) {
        connection.query('CALL AddABTrans(?,?)', [bookId,authorId],
            function (err, res, fields) {
                if (err) throw err;
                console.log('\n Successfully Added ABTrans!');
            });
    };

    function promptLoop() {
        inquirer
            .prompt([{
                type: 'list',
                name: 'choice',
                message: `For each author of this book, select an author name or enter a new one if not seen here: \n`,
                choices: choices
            }])
            .then(function (val) {
                // If user doesn't select Done, keep looping
                if (val.choice !== choices[choices.length - 1]) {

                    // if user selects Enter New Author, prompt to add new Author
                    if (val.choice === choices[choices.length - 2]) {
                        promptAddAuthor();
                    }
                    // Else add author to bookAuthors
                    else {
                        const author = utils.checkChoice(val.choice, authors);
                        bookAuthors.push(author);
                        promptLoop();
                    }
                }
                else {
                    // add ABTrans for each book author
                    bookAuthors.forEach(author => {
                        addABTrans(bookId, author.authorId);
                    })
                    // Go to previous menu once complete
                    promptSelectPublisher(publishers)
                }
            });
    }
    promptLoop();
}

exports.start = start;