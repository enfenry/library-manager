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
    queries.showAuthors(promptSelectAuthor)
}

function promptSelectAuthor(authors) {
    let choices = utils.getChoiceList(authors);

    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            message: `Which author would you like to Update?`,
            choices: choices
        }])
        .then(function (val) {
            // If user selects Quit to Previous, go back to previous menu
            if (val.choice === choices[choices.length - 1]) {
                adminBookAuthor.start();
            }
            else {
                const author = utils.checkChoice(val.choice, authors);
                promptUpdateAuthor(author);
            }
        });
}

function promptUpdateAuthor(author) {
    inquirer
        .prompt([{
            type: 'input',
            name: 'authorName',
            message: `You have chosen to update an author. \n Enter ‘quit’ to cancel operation. \n Please enter new author name or enter N/A for no change:`
        }])
        .then(function (val) {
            val.authorName = val.authorName.trim();
            if (val.authorName.toLowerCase() === 'quit') {
                start();
            }
            else {
                if (val.authorName.toLowerCase() !== 'n/a' && val.authorName.toLowerCase() !== '') {
                    author.authorName = val.authorName;
                    updateAuthor(author);
                }
            }
        });
}

function updateAuthor(author) {
    connection.query('CALL UpdateAuthor(?,?)', [author.authorId, author.authorName],
        function (err, res, fields) {
            if (err) throw err;
            console.log('\n Successfully Updated!');
            // Go back to previous menu
            queries.showAuthors(promptSelectAuthor)
        });
}

exports.start = start;