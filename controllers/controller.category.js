/**
 * controller.category.js
 * @author: Supeshala Silva
 * @description: This represents the controller for the category component
 *               Includes all the server side controller functions
 */

const db = require('../models');
const category = db.category;
const entry = db.passwordEntry;


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }
    let newCategory = {
        categoryName: req.body.categoryName,
    }

    console.log(newCategory)
    category.create(newCategory)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the Category.',
            });
        });
}

exports.findAll = (req, res) => {
    category.findAll().then((categories) => res.json(categories));
}

exports.findAllEntriesOfCategory = (req, res) => {
    category.findAll({
        where: {id: req.params.id}, include: {
            model: entry
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving all entries of category."
            });
        });
}

