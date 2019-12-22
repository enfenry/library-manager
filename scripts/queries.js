const connection = require('../app').connection;
const utils = require('./utils');
const inquirer = require('inquirer');

exports.showBranches = function (cb, cardNo) {
    connection.query('SELECT * FROM tbl_library_branch', function (err, res) {
        if (err) throw err;
        const branches = utils.addBranchMenuText(res);
        // TODO: change to ternary operator
        if (cardNo) {
            cb(branches, cardNo);
        }
        else {
            cb(branches);
        }
    });
}