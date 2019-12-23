const app = require('../../app');
const admin = require('./admin');
const inquirer = require('inquirer');
var connection;
var utils;
var queries;

function start() {
    connection = app.connection;
    utils = require('../utils');
    queries = require('../queries');

    let choices = [
        '1) Add Publisher',
        '2) Update Publisher',
        '3) Delete Publisher',
        '4) Quit to previous'
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
                    // Add Publisher
                    promptAddPublisher();
                    break;
                case choices[1]:
                    // Update Publisher
                    queries.showPublishers(promptSelectPublisher,true);
                    break;
                case choices[2]:
                    // Delete Publisher
                    queries.showPublishers(promptSelectPublisher);
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

function promptAddPublisher() {
    inquirer
        .prompt([{
            type: 'input',
            name: 'publisherName',
            message: `You have chosen to add a publisher. \n Enter ‘quit’ at any prompt to cancel operation. \n Please enter publisher publisherName:`,
            validate: function (input) {
                return input.trim().toLowerCase() !== 'n/a' && input.trim().toLowerCase() !== '';
            }
        }, {
            type: 'input',
            name: 'publisherAddress',
            message: `Please enter publisher address:`,
            validate: function (input) {
                return input.trim().toLowerCase() !== 'n/a' && input.trim().toLowerCase() !== '';
            }
        }, {
            type: 'input',
            name: 'publisherPhone',
            message: `Please enter publisher phone:`,
            validate: function (input) {
                return input.trim().toLowerCase() !== 'n/a' && input.trim().toLowerCase() !== '';
            }
        }])
        .then(function (val) {
            val.publisherName = val.publisherName.trim();
            val.publisherAddress = val.publisherAddress.trim();
            val.publisherPhone = val.publisherPhone.trim();
            if (val.publisherName.toLowerCase() === 'quit' || val.publisherAddress.toLowerCase() === 'quit' || val.publisherPhone.toLowerCase() === 'quit') {
                start();
            }
            else {
                addPublisher(val);
            }
        });
}

function addPublisher(val) {
    connection.query('CALL AddPublisher(?,?,?)', [val.publisherName, val.publisherAddress, val.publisherPhone],
        function (err, res, fields) {
            if (err) throw err;
            console.log('Successfully Added!');
            // Go back to previous menu
            promptAddPublisher();
        });
}

function promptSelectPublisher(publishers, isUpdating) {
    let choices = utils.getChoiceList(publishers);

    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            message: `Which publisher would you like to ${isUpdating ? `Update` : `Delete`}?`,
            choices: choices
        }])
        .then(function (val) {
            // If user selects Quit to Previous, go back to previous menu
            if (val.choice === choices[choices.length - 1]) {
                start();
            }
            else {
                const publisher = utils.checkChoice(val.choice, publishers);
                if (isUpdating) {
                    promptUpdatePublisher(publisher);
                }
                else {
                    deletePublisher(publisher);
                }
            }
        });
}

function promptUpdatePublisher(publisher) {
    inquirer
        .prompt([{
            type: 'input',
            name: 'publisherName',
            message: `You have chosen to update a publisher. \n Enter ‘quit’ at any prompt to cancel operation. \n Please enter new publisher name or enter N/A for no change:`
        }, {
            type: 'input',
            name: 'publisherAddress',
            message: `Please enter new publisher address or enter N/A for no change:`
        }, {
            type: 'input',
            name: 'publisherPhone',
            message: `Please enter new publisher phone or enter N/A for no change:`
        }])
        .then(function (val) {
            val.publisherName = val.publisherName.trim();
            val.publisherAddress = val.publisherAddress.trim();
            val.publisherPhone = val.publisherPhone.trim();
            if (val.publisherName.toLowerCase() === 'quit' || val.publisherAddress.toLowerCase() === 'quit' || val.publisherPhone.toLowerCase() === 'quit') {
                start();
            }
            else {
                if (val.publisherName.toLowerCase() !== 'n/a' && val.publisherName.toLowerCase() !== '') {
                    publisher.publisherName = val.publisherName;
                }
                if (val.publisherAddress.toLowerCase() !== 'n/a' && val.publisherAddress.toLowerCase() !== '') {
                    publisher.publisherAddress = val.publisherAddress;
                }
                if (val.publisherPhone.toLowerCase() !== 'n/a' && val.publisherPhone.toLowerCase() !== '') {
                    publisher.publisherPhone = val.publisherPhone;
                }
                updatePublisher(publisher);
            }
        });
}

function updatePublisher(publisher) {
    connection.query('CALL UpdatePublisher(?,?,?,?)', [publisher.publisherId, publisher.publisherName, publisher.publisherAddress, publisher.publisherPhone],
        function (err, res, fields) {
            if (err) throw err;
            console.log('Successfully Updated!');
            // Go back to previous menu
            queries.showPublishers(promptSelectPublisher,true);
        });
}

function deletePublisher(publisher) {
    connection.query('CALL DeletePublisher(?)', publisher.publisherId,
    function (err, res, fields) {
        if (err) throw err;
        console.log('Successfully Deleted!');
        // Go back to previous menu
        queries.showPublishers(promptSelectPublisher);
    });
}

exports.start = start;