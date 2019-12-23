const app = require('../../../app');
const admin = require('../admin');
const addBookAuthor = require('./addBookAuthor');
const updateBook = require('./updateBook');
const updateAuthor = require('./updateAuthor');
const deleteBookAuthor = require('./deleteBookAuthor');
const inquirer = require('inquirer');

function start() {
    let choices = [
        '1) Add Book/Author',
        '2) Update Book',
        '3) Update Author',
        '4) Delete Book/Author',
        '5) Quit to previous'
    ];

    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            choices: choices
        }])
        .then(function (val) {
            switch (val.choice) {
                case choices[0]:
                    // Add Book/Author
                    addBookAuthor.start();
                    break;
                case choices[1]:
                    // Update Book
                    updateBook.start();
                    break;
                case choices[2]:
                    // Update Author
                    updateAuthor.start();
                    break;
                case choices[3]:
                    // Delete Book/Author
                    deleteBookAuthor.start();
                    break;
                case choices[choices.length - 1]:
                    // If user selects Quit to Previous, go back to previous menu
                    admin.start();
                    break;
                default:
                    process.exit(0);
            };
        });
}

exports.start = start;