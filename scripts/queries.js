const connection = require('../app').connection;
const utils = require('./utils');

exports.showPublishers = function (cb, option) {
    connection.query('SELECT * FROM tbl_publisher', function (err, res) {
        if (err) throw err;
        const publishers = utils.addPublisherMenuText(res);
        // TODO: change to ternary operator
        if (option) {
            cb(publishers, option);
        }
        else {
            cb(publishers);
        }
    });
}

exports.showBranches = function (cb, option) {
    connection.query('SELECT * FROM tbl_library_branch', function (err, res) {
        if (err) throw err;
        const branches = utils.addBranchMenuText(res);
        // TODO: change to ternary operator
        if (option) {
            cb(branches, option);
        }
        else {
            cb(branches);
        }
    });
}

exports.showBorrowers = function (cb,option) {
    connection.query('SELECT * FROM tbl_borrower', function (err, res) {
        if (err) throw err;
        const borrowers = utils.addBorrowerMenuText(res);
        if (option) {
            cb(borrowers, option);
        }
        else {
            cb(borrowers);
        }
    });
}