/**
 * controller.passwordEntry.js
 * @author: Supeshala Silva
 * @description: This represents the controller for the password entry component
 *               Includes all the server side controller functions
 */

const db = require('../models');
const passwordEntry = db.passwordEntry;
const user = db.user;
const category=db.category;

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }
    let entry = {
        site: req.body.site,
        username: req.body.username,
        password: req.body.password,
        userId: req.body.userId,
        categoryId: req.body.categoryId
    }
    console.log(entry)
    passwordEntry.create(entry)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the Entry.',
            });
        });
}

// Retrieve all entries from the database.
exports.findAll = (req, res) => {
    passwordEntry.findAll().then((vehicles) => res.json(vehicles));
}

exports.findOne = (id) => {

    passwordEntry.findOne({where: {id: id}}).then(data => {
        return data;
    })
        .catch(err => {
           return 0;
        });
}

exports.findAllEntriesOfUser = (req, res) => {

    passwordEntry
        .findAll({
            where: { userId: req.params.id },
            include: [category],
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving entries of user.",
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    const userId=req.params.userId;
    if(userId){
        passwordEntry.findOne({where: {id: id}}).then(data => {
            if(data.userId==userId){
                passwordEntry.destroy({where: {id: id}})
                    .then(num => {
                        if (num == 1) {
                            res.send({
                                message: "Entry was deleted successfully!"
                            });
                        } else {
                            res.send({
                                message: `Cannot delete Entry with id=${id}. Maybe Entry was not found!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Could not delete Entry with id=" + id
                        });
                    });
            }else{
                res.send({
                    message: `Cannot delete Entry with id=${id}. Not allowed!`
                });
            }
        })
    }

};
